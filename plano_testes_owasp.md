# Plano de Testes de Segurança: OWASP Top 10 (Namtech Pro)

Este plano detalha a metodologia para testar as 10 vulnerabilidades mais críticas da web no contexto da Namtech Pro, utilizando os agentes de Pentest e Skills de Segurança disponíveis no sistema.

## 1. Escopo e Metodologia
*   **Alvo:** Site Namtech Pro (Frontend, Backend Convex, Integração Clerk).
*   **Abordagem:** Gray Box (Acesso parcial ao código e banco de dados).
*   **Agentes Utilizados:** `vulnerability-scanner`, `html-injection-testing`, `sql-injection-testing`, `webapp-testing`.

---

## 2. Matriz de Testes (OWASP Top 10)

| Categoria | Tipo de Teste | Skill/Agente Relacionado |
| :--- | :--- | :--- |
| **A01: Broken Access Control** | Tentar acessar `/backoffice` sem login; Manipular IDs de agendamento na URL. | `webapp-testing` + `pentest-checklist` |
| **A02: Cryptographic Failures** | Verificar se dados sensíveis (emails/telefones) trafegam em HTTP ou sem SSL. | `vulnerability-scanner` |
| **A03: Injection** | Injetar scripts no Formulário de Agendamento e formulário de Contacto. | `html-injection-testing` + `sql-injection-testing` |
| **A04: Insecure Design** | Revisão da lógica de fluxo do agendamento (ex: marcar datas no passado). | `software-architecture` |
| **A05: Security Misconfiguration** | Scanner de cabeçalhos de segurança (CSP, HSTS) e ficheiros expostos. | `vulnerability-scanner` |
| **A06: Vulnerable Components** | Auditoria de pacotes `npm` no `package.json` (npm audit). | `vulnerability-scanner` |
| **A07: Auth Failures** | Testar se é possível "saltar" a autenticação do Clerk ou reutilizar sessões. | `pentest-commands` |
| **A08: Integrity Failures** | Verificar se o sistema aceita dados mal formatados sem validação rigorosa. | `pentest-checklist` |
| **A09: Logging Failures** | Tentar realizar acções maliciosas e verificar se aparecem nos logs do Convex. | `pentest-commands` |
| **A10: SSRF** | Testar se o site pode ser usado como proxy para aceder a servidores internos. | `webapp-testing` |

---

## 3. Procedimento de Execução

### Fase 1: Reconhecimento
*   Mapear todos os pontos de entrada de dados (formulários de agendamento, contacto, newsletters).
*   Identificar as tecnologias e versões utilizadas (Next.js 15, Convex, Clerk).

### Fase 2: Testes Automatizados
*   Executar o script `security_scan.py` do agente `vulnerability-scanner`.
*   Correr `npm audit` para detectar bibliotecas com vulnerabilidades conhecidas.

### Fase 3: Testes Manuais de Invasão
*   **Foco Injeção:** Tentar injetar payloads de HTML/JS nos campos de "Notas Adicionais" do agendamento.
*   **Foco Lógica:** Tentar submeter agendamentos com dados inconsistentes ou burlar validações de data/hora.

### Fase 4: Relatório e Mitigação
*   Classificar as falhas encontradas em: **Crítica, Alta, Média ou Baixa**.
*   Documentar as correções efetuadas no `relatorio_seguranca.md`.

---

## 4. Ferramentas Prontas para Uso
*   **Scripts de Scanner:** `.agent/skills/skills/vulnerability-scanner/scripts/security_scan.py`
*   **Base de Payloads:** `.agent/skills/skills/html-injection-testing/SKILL.md`

---
**Elaborado por:** Antigravity (AI Security Agent)
**Data:** 09/02/2026
