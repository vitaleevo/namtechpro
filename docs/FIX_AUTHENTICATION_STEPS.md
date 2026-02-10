# Passo Final para Corrigir a Autenticação

Acabei de atualizar o teu projeto com as novas credenciais do Clerk (`pk_test_YnJpZWY...`).

Para que o login funcione no Backoffice, tens de fazer **UMA COISA** manualmente no site do Clerk:

1.  Acede ao [Clerk Dashboard](https://dashboard.clerk.com/) da tua nova instância (`brief-eft-88`).
2.  No menu lateral esquerdo, clica em **JWT Templates**.
3.  Clica no botão **New Template**.
4.  Seleciona o ícone do **Convex**.
5.  Define o nome como: `convex` (tudo minúsculo).
6.  Clica em **Apply Changes**.

**Porquê?**
O teu site pede um token chamado "convex" para se autenticar. Se este template não existir no Clerk, o site recebe um erro `404` (o que estavas a ver).

Assim que criares este template, o login no `/namtechprobackoffice` deve funcionar imediatamente! 🚀
