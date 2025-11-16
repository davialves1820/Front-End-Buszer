# 🧪 Testes - Buszer Frontend

Este documento descreve o setup e execução dos **testes** do frontend do Buszer, incluindo **unitários, integração e E2E**, para diferentes navegadores e dispositivos.

---

## 1️⃣ Dependências

Certifique-se de que você tem instalado:

- Node.js ≥ 18
- npm ≥ 9
- Playwright (já incluído nas dependências do projeto)
- Vite

Instale as dependências do frontend:

```bash
cd frontend
npm ci
```

---

## 2️⃣ Tipos de Testes

### Unitários e de Integração (Vitest + Testing Library)

- **Localização**: `frontend/src/__tests__` ou `frontend/tests/unit` / `frontend/tests/integration`
- **Framework**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Uso**:

  ```bash
  # Unitários
  npm run test:unit

  # Integração
  npm run test:integration
  ```

- **Exemplo de teste unitário**: validação de componentes React com `render` e `screen`.

---

### E2E (Playwright)

- **Localização**: `frontend/tests/e2e`
- **Browsers suportados**:
  - Desktop: Chromium, Firefox, WebKit, Edge
  - Mobile: iPhone 14, Pixel 6 (emulação)
- **Setup**: `playwright.config.ts` define os browsers e dispositivos
- **Execução**:

  ```bash
  # Roda todos os testes E2E em todos os navegadores e dispositivos
  npx playwright test
  ```

- **Opções úteis**:

  ```bash
  # Roda testes em headful (janela visível)
  npx playwright test --headed

  # Apenas testes do arquivo específico
  npx playwright test tests/e2e/homepage.spec.ts

  # Relatório HTML
  npx playwright show-report
  ```

---

## 3️⃣ Estrutura de testes sugerida

```
frontend/
├─ src/
│  ├─ __tests__/            # Testes unitários rápidos
├─ tests/
│  ├─ unit/                 # Testes unitários separados
│  ├─ integration/          # Testes de integração
│  └─ e2e/                  # Testes end-to-end (Playwright)
```

- Use `data-testid` nos elementos que precisam ser acessados nos testes E2E.
- Para filtros, cards e campos de busca, inclua `data-testid="nome-do-elemento"` nos componentes React.

---

## 4️⃣ Observações importantes

- **Mobile vs Desktop**: os testes E2E rodam em mobile e desktop simulando resolução, user-agent e eventos de toque.
- **CI**: os workflows do GitHub Actions executam automaticamente todos os testes em cada pull request.
- **Timeouts**: testes E2E podem demorar mais em dispositivos móveis (emulação) → ajuste o `timeout` em `playwright.config.ts` se necessário.
- **Erros comuns**:
  - `ERR_CONNECTION_REFUSED` → o Vite server não estava rodando.
  - `Test timeout exceeded` → aumentar timeout ou verificar performance do servidor.

---

## 5️⃣ Comandos resumidos

| Tipo de teste        | Comando                      |
| -------------------- | ---------------------------- |
| Unitários            | `npm run test:unit`          |
| Integração           | `npm run test:integration`   |
| E2E (desktop+mobile) | `npx playwright test`        |
| Relatório Playwright | `npx playwright show-report` |

### Observações

- Para erros de identação rodar: npx prettier --write .
