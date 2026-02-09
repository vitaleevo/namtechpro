---
description: follow the 3-step development process (Research, Spec, Code)
---

# Development Process Workflow

This workflow follows the "Best process so far" identified in the project documentation.

## Step 1: Research & PRD
1. **Identify the implementation goal.**
2. **Search the codebase** for relevant files, documentation, and patterns.
3. **Generate a PRD** using the template at `.agent/templates/PRD_template.md`.
4. **Save as** `docs/PRD-[feature-name].md`.

## Step 2: Specification
1. **Read the generated PRD.**
2. **Identify specific implementation details**:
   - Files to create/modify.
   - Logic and data flow.
   - Code snippets.
3. **Generate a Spec** using the template at `.agent/templates/Spec_template.md`.
4. **Save as** `docs/Spec-[feature-name].md`.

## Step 3: Implementation (Coding)
1. **Follow the Spec.**
2. **Implement changes** incrementally.
3. **Verify** against the success criteria in the PRD.
