# 🚀 Instruções de Deploy - Namtech Pro (Vercel)

Este repositório foi limpo e organizado para um deploy suave na Vercel. Abaixo estão os passos e configurações necessárias.

## 1. Configuração no Painel da Vercel

Ao importar o repositório na Vercel, utilize estas configurações:

- **Framework Preset:** Next.js
- **Root Directory:** `frontend` (Este é o passo mais importante!)
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 2. Variáveis de Ambiente (Environment Variables)

Adicione as seguintes variáveis no painel da Vercel (aba Settings > Environment Variables):

| Variável | Valor Recomendado |
| :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_YnJpZWYtZWZ0LTg4LmNsZXJrLmFjY291bnRzLmRldiQ` |
| `CLERK_SECRET_KEY` | `sk_test_sMbjQ0L5VcvVvf4iKrK88wTypb4kDimkc5lKkGgmhB` |
| `NEXT_PUBLIC_CONVEX_URL` | `https://reminiscent-basilisk-530.convex.cloud` (PROD) |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `namtechproo@gmail.com` |

> **Nota:** Se preferir testar em ambiente de desenvolvimento primeiro, use o URL do Convex: `https://cheery-hamster-496.convex.cloud`.

## 3. Configuração do Clerk (JWT Template)

Para que o login funcione, lembre-se de configurar o Template JWT no Dashboard do Clerk:
1. Vá a **JWT Templates** > **New Template**.
2. Escolha **Convex**.
3. Use o nome **`convex`** (tudo minúsculo).

## 4. O que foi limpo?
- Removido o backend NestJS legado (código morto).
- Removidos ficheiros `.md` de planejamento antigos.
- Removidos ficheiros sensíveis e assets duplicados.
- Otimizada a estrutura de traduções (modularizada).

---
**Namtech Pro - Sistema Otimizado e Seguro**
