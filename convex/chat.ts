import { query, mutation, action, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { validateAdmin } from "./auth_utils";

// --- Queries ---

export const getMessages = query({
    args: { sessionId: v.id("chat_sessions") },
    handler: async (ctx, args) => {
        // TODO: Security - Add session token validation to prevent IDOR
        return await ctx.db
            .query("chat_messages")
            .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
            .collect();
    },
});

export const listActiveSessions = query({
    args: {},
    handler: async (ctx) => {
        try {
            await validateAdmin(ctx);
            return await ctx.db
                .query("chat_sessions")
                .withIndex("by_status")
                .filter((q) => q.neq(q.field("status"), "closed"))
                .order("desc") // Optional: show most recent first
                .collect();
        } catch {
            return [];
        }
    },
});

// --- Mutations ---

export const createSession = mutation({
    args: { userName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        return await ctx.db.insert("chat_sessions", {
            status: "bot",
            userName: args.userName,
            lastMessageAt: Date.now(),
        });
    },
});

// Internal mutation for secure bot messages
export const internalAddBotMessage = internalMutation({
    args: {
        sessionId: v.id("chat_sessions"),
        text: v.string(),
        options: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { sessionId, text, options } = args;

        await ctx.db.patch(sessionId, { lastMessageAt: Date.now() });

        return await ctx.db.insert("chat_messages", {
            sessionId,
            sender: "bot",
            text,
            options,
            createdAt: Date.now(),
        });
    },
});

// Public mutation with security checks
export const addMessage = mutation({
    args: {
        sessionId: v.id("chat_sessions"),
        sender: v.string(),
        text: v.string(),
        options: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { sessionId, sender, text, options } = args;

        // Security Check 1: Prevent Bot Spoofing
        if (sender === "bot") {
            throw new Error("Security Violation: Clients cannot send messages as 'bot'.");
        }

        // Security Check 2: Validate Admin
        if (sender === "admin") {
            await validateAdmin(ctx);
        }

        // Update session timestamp
        await ctx.db.patch(sessionId, { lastMessageAt: Date.now() });

        return await ctx.db.insert("chat_messages", {
            sessionId,
            sender, // 'user' or 'admin' (validated)
            text,
            options,
            createdAt: Date.now(),
        });
    },
});

export const requestHuman = mutation({
    args: { sessionId: v.id("chat_sessions") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.sessionId, { status: "human" });
    },
});

export const closeSession = mutation({
    args: { sessionId: v.id("chat_sessions") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.sessionId, { status: "closed" });
    },
});

// --- Bot Logic ---

export const processBotResponse = action({
    args: { sessionId: v.id("chat_sessions"), text: v.string() },
    handler: async (ctx, args) => {
        const text = args.text.toLowerCase();
        let response = "";
        let options: string[] | undefined = undefined;

        // Fetch dynamic context
        const categories = await ctx.runQuery(api.categories.list, { type: "product" });
        const catNames = categories.map(c => c.name);

        // --- Intelligence Logic ---

        // 1. GREETINGS
        if (["ola", "olá", "oi", "bom dia", "boa tarde", "boa noite", "hey"].some(k => text.includes(k))) {
            response = "Olá! É um prazer recebê-lo na Namtech Pro. Sou o seu guia digital. Como posso tornar o seu dia mais produtivo?";
            options = ["Ver Produtos", "Nossos Serviços", "Falar com Consultor"];
        }

        // 2. PRODUCTS / CATALOG
        else if (text.includes("produto") || text.includes("catalogo") || text.includes("catálogo") || text.includes("comprar") || text.includes("venda") || text.includes("ver produtos")) {
            response = `Temos soluções avançadas em várias áreas. Qual destas categorias gostaria de explorar primeiro?`;
            options = catNames.slice(0, 4);
            if (options.length === 0) options = ["Energia Solar", "Navegação", "Segurança"];
        }

        // 3. SERVICES
        else if (text.includes("serviço") || text.includes("fazem") || text.includes("fazer") || text.includes("trabalho") || text.includes("nossos serviços")) {
            response = "A Namtech Pro foca-se na excelência tecnológica. Operamos em 4 pilares principais:";
            response += "\n\n1. Energia Sustentável\n2. Tecnologia Naval\n3. Comunicações\n4. Segurança Eletrónica";
            response += "\n\nQual deles quer conhecer a fundo?";
            options = ["Energia", "Naval", "Rádio/Comunicações", "Segurança"];
        }

        // 4. PRICE / QUOTE
        else if (text.includes("preço") || text.includes("custo") || text.includes("quanto") || text.includes("valor") || text.includes("orçamento")) {
            response = "Os nossos projetos são personalizados para garantir o melhor custo-benefício. Gostaria de solicitar um orçamento formal ou prefere falar com um especialista?";
            options = ["Pedir Orçamento", "Falar com Especialista"];
        }

        // 5. LOCATION
        else if (text.includes("onde") || text.includes("fica") || text.includes("local") || text.includes("angola") || text.includes("luanda") || text.includes("namibe")) {
            response = "Estamos sediados no Namibe, mas os nossos técnicos cobrem Angola inteira (Luanda, Lobito, Soyo, etc.). Onde está o seu projeto?";
            options = ["Ver Contactos", "Falar com Consultor"];
        }

        // 6. HUMAN Handoff
        else if (text.includes("humano") || text.includes("pessoa") || text.includes("especialista") || text.includes("falar com") || text.includes("atendimento") || text.includes("ajuda")) {
            await ctx.runMutation(api.chat.requestHuman, { sessionId: args.sessionId });
            response = "Entendido. A sua conversa foi priorizada. Um dos nossos consultores técnicos irá assumir este chat em segundos. Por favor, não feche a janela.";
            // No options here, as we wait for the human
        }

        // 7. THANK YOU
        else if (text.includes("obrigado") || text.includes("grato") || text.includes("valeu") || text.includes("agradeço")) {
            response = "Disponha sempre! O sucesso do seu projeto é a nossa prioridade. Precisa de algo mais?";
            options = ["Sim, outra dúvida", "Não, obrigado"];
        }

        // FALLBACK
        else {
            response = "Ainda estou a aprender, mas posso ajudá-lo a encontrar produtos, serviços ou ligá-lo a um técnico. O que prefere fazer?";
            options = ["Ver Catálogo", "Falar com Humano"];
        }

        // SECURE IMPLEMENTATION: Use internal mutation
        await ctx.runMutation(internal.chat.internalAddBotMessage, {
            sessionId: args.sessionId,
            text: response,
            options: options
        });
    },
});
