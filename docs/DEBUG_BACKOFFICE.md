# Debug Backoffice - Tela Branca Resolvida

A "tela branca" foi substituída por um ecrã de diagnóstico que mostra exatamente onde está o problema.

## Possíveis Causas e Soluções

### 1. Mensagem "A conectar... ⏳" (Loop Infinito)
Isto significa que o **Convex** não está a aceitar o teu login do Clerk.
**Causa:** O ambiente onde estás a trabalhar (`dev:cheery-hamster-496` ou `prod:reminiscent-basilisk-530`) ainda não tem a configuração de JWT correta.

**Solução:**
1.  **Verifica o JWT Template:** No [Clerk Dashboard](https://dashboard.clerk.com/), garante que tens um template chamado `convex`.
2.  **Verifica o Deploy:** O Convex só aceita as novas chaves (`pk_test_YnJpZWY...`) se tiveres feito o deploy do ficheiro `auth.config.ts` com o domínio novo (`https://brief-eft-88...`).
    *   Para garantir que o ambiente local (dev) está atualizado, executa no terminal:
        ```bash
        npx convex dev --once
        ```
        (Isto vai atualizar o servidor de desenvolvimento com as novas configurações).

### 2. Mensagem "Acesso Restrito"
Isto significa que o login funcionou, mas o teu email não é o email de administrador.
**Causa:** Estás logado com uma conta diferente de `namtechproo@gmail.com`.

**Solução:**
- Clica em "Trocar Conta" e faz login com o email correto.
- Ou, se quiseres mudar o admin, atualiza a variável `NEXT_PUBLIC_ADMIN_EMAIL` no ficheiro `.env.local` e faz `npx convex env set ADMIN_EMAIL "novo@email.com"`.

**Nota:** Se vires algum erro, recarrega a página ou tenta abrir numa janela anónima para limpar caches antigos.
