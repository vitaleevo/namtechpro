# Plano de Correção e Documento de Análise - Namtech Pro

## 1. Análise do Problema (Perda de Logo)

Com base nas imagens enviadas e na inspeção do código-fonte, identifiquei que o logotipo (logo) não carrega corretamente em certas partes do site ou desaparece após a navegação.

### Causas Identificadas:
*   **Caminho do Arquivo (Faltando):** No `Navbar.tsx` e `Footer.tsx`, o componente `Image` do Next.js está tentando carregar `/images/principal.png`. No entanto, na pasta `public/images`, o arquivo exato é `principal .png` (com um espaço antes do ponto).
*   **Problemas de Renderização do Lado do Cliente (Hydration):** Algumas inconsistências entre o que o servidor gera e o que o cliente (navegador) renderiza podem causar o desaparecimento de elementos visuais rápidos.
*   **Filtros de Cor (CSS):** No rodapé (`Footer.tsx`), está sendo usado `brightness-0 invert` para tornar o logo branco. Se o arquivo original tiver problemas de transparência ou se o caminho estiver errado, nada será exibido.

## 2. Relatório de Análise Geral do Site

### Pontos Fortes:
*   **Tecnologia Moderna:** Utilização de Next.js 15, Tailwind CSS e Framer Motion para animações fluidas.
*   **Design Premium:** Estética voltada para o setor marítimo/industrial com cores sóbrias (Azul Profundo) e destaques em Amarelo (Namtech Gold).
*   **Internacionalização:** Sistema de idiomas (PT, EN, FR) já implementado.

### Oportunidades de Melhoria (Além do Logo):
*   **Otimização de Imagens:** Algumas imagens carregam via Unsplash. Para produção, é recomendado usar imagens locais otimizadas.
*   **Consistência de Tipografia:** Verifiquei o uso de 'Outfit' e 'Inter'. Garantiremos que estejam aplicadas uniformemente.
*   **Link de Suporte:** O botão de suporte no Navbar redireciona para `/contactos`, mas poderia ter um comportamento mais direto (chat ou modal).
*   **SEO:** Os títulos de página e meta-descrições podem ser mais agressivos para o mercado angolano.

## 3. Plano de Correção Detalhado

### Fase 1: Correção do Logo (Imediato)
1.  **Padronização de Nomes:** Renomear os arquivos na pasta `public/images/` para remover espaços e caracteres especiais (ex: `principal .png` -> `logo-primary.png`).
2.  **Atualização de Componentes:** Ajustar o `Navbar.tsx` e `Footer.tsx` para apontar para o novo nome de arquivo constante.
3.  **Fallback Visual:** Adicionar um texto de "Namtech Pro" caso a imagem falhe em carregar (Acessibilidade).

### Fase 2: Ajustes de Consistência
1.  **Navbar:** Garantir que o logo tenha as dimensões corretas e não "salte" durante o carregamento da página.
2.  **Footer:** Ajustar a inversão de cores para garantir visibilidade máxima no fundo escuro.

### Fase 3: Validação
1.  Testar em dispositivos móveis e desktop.
2.  Testar em diferentes navegadores (Chrome, Safari, Edge).

---

Este plano visa não apenas "tapar o buraco", mas garantir que a infraestrutura de imagens do site seja robusta para futuras expansões.
