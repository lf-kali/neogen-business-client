# Relatório de Lint (ESLint)

Gerado em: 2026-03-06T16:57:07.729Z

## Resumo

- Errors: 16
- Warnings: 3

## Itens

| Severidade | Arquivo | Linha | Col | Regra | Mensagem |
|---|---|---:|---:|---|---|
| error | src/api/http/apiError.ts | 10 | 32 | @typescript-eslint/no-explicit-any | Unexpected any. Specify a different type. |
| error | src/contexts/AuthContext.tsx | 13 | 14 | react-refresh/only-export-components | Fast refresh only works when a file only exports components. Move your React context(s) to a separate file. |
| error | src/contexts/AuthContext.tsx | 23 | 14 | react-refresh/only-export-components | Fast refresh only works when a file only exports components. Move your React context(s) to a separate file. |
| warning | src/contexts/AuthContext.tsx | 42 | 11 | react-hooks/exhaustive-deps | The 'reloadSession' function makes the dependencies of useMemo Hook (at line 102) change on every render. To fix this, wrap the definition of 'reloadSession' in its own useCallback() Hook. |
| error | src/contexts/AuthContext.tsx | 70 | 14 | react-hooks/set-state-in-effect | Error: Calling setState synchronously within an effect can trigger cascading renders … |
| warning | src/contexts/AuthContext.tsx | 73 | 5 | react-hooks/exhaustive-deps | The 'handleLogin' function makes the dependencies of useMemo Hook (at line 97) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'handleLogin' in its own useCallback() Hook. |
| warning | src/contexts/AuthContext.tsx | 89 | 5 | react-hooks/exhaustive-deps | The 'handleLogout' function makes the dependencies of useMemo Hook (at line 97) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'handleLogout' in its own useCallback() Hook. |
| error | src/contexts/AuthContext.tsx | 116 | 14 | react-refresh/only-export-components | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| error | src/contexts/AuthContext.tsx | 117 | 14 | react-refresh/only-export-components | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| error | src/core/session.ts | 103 | 21 | @typescript-eslint/no-explicit-any | Unexpected any. Specify a different type. |
| error | src/features/device/device.types.ts | 6 | 28 | @typescript-eslint/no-empty-object-type | The `{}` ("empty object") type allows any non-nullish value, including literals like `0` and `""`. … |
| error | src/features/deviceBrand/deviceBrand.types.ts | 6 | 33 | @typescript-eslint/no-empty-object-type | The `{}` ("empty object") type allows any non-nullish value, including literals like `0` and `""`. … |
| error | src/features/deviceModel/deviceModel.types.ts | 6 | 33 | @typescript-eslint/no-empty-object-type | The `{}` ("empty object") type allows any non-nullish value, including literals like `0` and `""`. … |
| error | src/features/serviceOrder/serviceOrder.types.ts | 6 | 34 | @typescript-eslint/no-empty-object-type | The `{}` ("empty object") type allows any non-nullish value, including literals like `0` and `""`. … |
| error | src/pages/customer-register/CustomerRegister.tsx | 25 | 18 | @typescript-eslint/no-unused-vars | 'onSubmit' is defined but never used. |
| error | src/pages/customer-register/CustomerRegister.tsx | 30 | 14 | prefer-const | 'key' is never reassigned. Use 'const' instead. |
| error | src/pages/service-order-create/ServiceOrderCreate.tsx | 15 | 9 | @typescript-eslint/no-unused-vars | 'user' is assigned a value but never used. |
| error | src/pages/service-order-create/ServiceOrderCreate.tsx | 17 | 9 | @typescript-eslint/no-unused-vars | 'redirectTo' is assigned a value but never used. |
| error | src/pages/tech-register/TechRegister.tsx | 110 | 19 | @typescript-eslint/no-explicit-any | Unexpected any. Specify a different type. |

---

Comando usado: `eslint . --format json`