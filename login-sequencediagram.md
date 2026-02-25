sequenceDiagram
  autonumber
  participant U as Usuário
  participant P as Login.tsx
  participant H as useLogin
  participant R as authRepository
  participant X as axios(http)
  participant S as session(localStorage)
  participant A as API Nest (/technicians/login)

  U->>P: submit (email, password)
  P->>H: login({usuario: email, senha: password})
  H->>R: login(payload)
  R->>X: POST /technicians/login (body contrato)
  X->>A: request
  A-->>X: {token: "Bearer <jwt>", ...user}
  H->>S: setToken(res.token) (salva só o JWT)
  Note over X,S: Próximas requests: Authorization: Bearer <jwt>