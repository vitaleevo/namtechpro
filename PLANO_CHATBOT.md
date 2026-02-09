# Plano de Implementação: Chatbot Híbrido (IA + Admin)

Este plano descreve as etapas para implementar um sistema de chat inteligente na Namtech Pro, que utiliza respostas predefinidas e IA para responder sobre o conteúdo do site e permite a transferência para um administrador humano.

## 1. Arquitetura do Sistema

### Backend (Convex)
- **Tabela `chat_sessions`**: Armazena sessões de chat (ID do usuário, status: `bot` | `human`, timestamp).
- **Tabela `chat_messages`**: Armazena o histórico de mensagens (sender: `bot` | `user` | `admin`, conteúdo, sessionId).
- **Mutação `sendMessage`**: Processa a mensagem do usuário. Se o status for `bot`, tenta responder via base de conhecimento. Se o usuário pedir "humano" ou "falar com alguém", muda status para `human` e gera notificação.
- **Mutação `adminJoinChat`**: Permite que um admin assuma uma sessão.

### Frontend (User Site)
- **Componente `ChatWidget`**: Botão flutuante no canto inferior direito.
- **Interface de Chat**: Histórico de mensagens e campo de entrada.
- **Base de Conhecimento**: Arquivo de texto ou JSON com informações sobre produtos, serviços, localização e contatos da Namtech Pro para alimentar o Bot.

### Backoffice (Admin)
- **Página `Live Chat`**: Lista de sessões ativas com status "Aguardando Admin".
- **Sistema de Notificações**: Alerta sonoro ou visual quando uma conversa é transferida para humano.

---

## 2. Etapas de Implementação

### Fase 1: Base de Dados e Schema
1. Adicionar `chat_sessions` e `chat_messages` ao `convex/schema.ts`.
2. Criar `convex/chat.ts` com funções `listActiveSessions`, `getMessages`, `sendMessage`, `requestHuman`.

### Fase 2: Lógica do Chatbot (Regras Predefinidas)
1. Criar um conjunto de dados (Knowledge Base) sobre a Namtech Pro.
2. Implementar lógica de busca simples (ou via IA básica) para responder perguntas frequentes:
   - "O que é a Namtech?"
   - "Quais serviços vocês oferecem?"
   - "Onde ficam localizados?"
3. Implementar o gatilho de transferência: Quando a palavra-chave "especialista", "humano", "falar com alguém" for detectada, o bot responde: *"Estou a transferir-te para um dos nossos especialistas. Por favor, aguarda um momento."*

### Fase 3: Interface do Usuário (Widget)
1. Desenvolver o `ChatWidget.tsx` usando Tailwind e Framer Motion para animações premium.
2. Integrar com Convex para persistência da conversa (usando localStorage para manter a sessão se o usuário atualizar a página).

### Fase 4: Painel do Administrador
1. Criar `/namtechprobackoffice/chat` para gerenciamento de conversas.
2. Implementar notificações em tempo real usando `useQuery` do Convex que monitora sessões com status `human`.

---

## 3. Próximos Passos Sugeridos

1. **Definição de Conteúdo**: Você prefere que o bot use apenas uma lista fixa de perguntas e respostas ou que use o conteúdo já cadastrado no banco de dados (Produtos, Eventos, Blog)?
2. **Notificações**: Gostaria de receber notificações por email também quando um chat for transferido?

Deseja que eu comece a implementação da **Fase 1 (Banco de Dados)** agora?
