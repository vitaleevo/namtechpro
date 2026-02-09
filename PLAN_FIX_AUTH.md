# Plano de Correção: Autenticação do Backoffice

## Problema
O erro `Uncaught ConvexError: Não autenticado. Por favor, faça login.` ocorre porque o utilizador está a tentar executar ações administrativas (criar, editar, eliminar produtos) sem estar autenticado ou sem as permissões necessárias.

As funções locais do Convex (`updateProduct`, `addProduct`, etc.) possuem uma validação rigorosa (`validateAdmin`) que exige:
1.  Que o utilizador esteja autenticado.
2.  Que o email do utilizador seja `namtechproo@gmail.com`.

Atualmente, o **layout do Backoffice** (`src/app/namtechprobackoffice/layout.tsx`) não impede o acesso a gestão de produtos, permitindo que utilizadores não autenticados vejam a interface, mas os pedidos ao servidor falham.

## Solução Proposta

### 1. Proteger o Layout do Backoffice
Implementar um "Guarda de Autenticação" no ficheiro `src/app/namtechprobackoffice/layout.tsx`.
- Utilizar `useAuth` e `useUser` do Clerk para verificar o estado da sessão.
- **Se não estiver autenticado:** Renderizar o componente `<SignIn />` centrado no ecrã para forçar o login.
- **Se autenticado mas não autorizado (email errado):** Mostrar uma mensagem de "Acesso Negado".
- **Se autorizado:** Renderizar o layout normal do Backoffice.

### 2. Verificar Permissões
Garantir que o email definido em `convex/auth_utils.ts` (`namtechproo@gmail.com`) corresponde à conta que será usada para login.

### 3. Melhorar Feedback Visual
Adicionar tratamento de erros no frontend para que, se a sessão expirar, o utilizador seja redirecionado ou notificado amigavelmente, em vez de ver apenas um erro na consola.

## Estado Atual ✅
1.  **Proteção de Layout:** Implementada em `layout.tsx` com diagnósticos para Clerk/Convex.
2.  **Correção de Imagens:** Corrigidos os avisos de `img` sem src e adicionados fallbacks no Backoffice.
3.  **Resolução de Storage:** As queries do Convex agora resolvem corretamente os IDs de armazenamento para URLs.

## Próximo Passo Crítico 🚨
- **Logout e Login:** O navegador possui um token antigo sem as permissões "convex". **É obrigatório fazer Logout e entrar novamente** para que o novo template JWT configurado no Clerk passe a ser válido.

