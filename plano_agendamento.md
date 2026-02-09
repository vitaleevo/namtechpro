# Plano de Implementação: Sistema de Agendamento e Auditoria de Links

## 1. O que falta e Auditoria de Sistema
Após análise técnica, identifiquei que o site possui uma estrutura sólida, mas faltam elementos de conversão direta e gestão de clientes.

### Verificação de Links e Botões:
*   **Links de Navegação:** Funcionam 100% (Início, Sobre, Catálogo, etc).
*   **Links Sociais:** Redirecionam corretamente para as páginas da Namtech Pro.
*   **Filtros do Catálogo:** Estão operacionais.
*   **Pendência Identificada:** Alguns botões de "Saber Mais" na Home redirecionam para o topo da página ou são genéricos; vamos mapeá-los para páginas de serviços específicas.

## 2. Sistema de Agendamento (Namtech Scheduler)
Implementaremos um sistema onde o cliente pode agendar visitas técnicas ou consultorias diretamente pelo site.

### Funcionalidades:
1.  **Formulário Dedicado:** Seleção de data, hora, tipo de serviço e localização (Namibe, Luanda, Lobito).
2.  **Integração com Backend:** Os agendamentos serão salvos no banco de dados Convex.
3.  **Status de Agendamento:** "Pendente", "Confirmado", "Concluído".

## 3. Arquivos Alterados e Afetados

| Arquivo | Impacto | Descrição |
| :--- | :--- | :--- |
| `convex/schema.ts` | **Alta** | Adição da tabela `appointments` para armazenar agendamentos. |
| `convex/appointments.ts` | **Nova** | Criação das funções (mutações/queries) para gerir agendamentos. |
| `frontend/src/i18n/translations.ts` | **Média** | Adição de termos traduzidos para o sistema de agendamento (PT, EN, FR). |
| `frontend/src/features/appointments/BookingForm.tsx` | **Nova** | Componente visual do formulário de agendamento. |
| `frontend/src/app/agendamento/page.tsx` | **Nova** | Nova rota/página pública para agendamentos. |
| `frontend/src/features/navigation/Navbar.tsx` | **Baixa** | Adição de link para o sistema de agendamento. |

## 4. Plano de Implementação (Passo a Passo)

### Passo 1: Infraestrutura de Dados (Backend)
Vou atualizar o esquema do Convex para suportar agendamentos e criar as funções de backend para salvar os dados.

### Passo 2: Interface de Agendamento (Frontend)
Criarei uma nova página dedicada `/agendamento` com um design premium, seguindo a identidade visual da Namtech (vidro/glassmorphism e cores da marca).

### Passo 3: Integração de Idiomas
Adicionarei as chaves de tradução para que clientes estrangeiros também possam agendar serviços.

### Passo 4: Teste de Stress de Links
Vou percorrer todos os botões do site para garantir que nenhum leve a um erro 404 ou fique sem resposta.

---
**Próxima Ação:** Iniciar a criação da tabela no banco de dados e as funções de backend.
