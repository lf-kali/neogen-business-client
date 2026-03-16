
---

## Passo 1: Atualizar o `AuthContext` para expor `setUser`

````tsx
import { createContext, useState, useContext, type ReactNode } from "react";
import { session, emptySession, type UserSession } from "../core/session";
import type { LoginRequest } from "../features/auth/auth.types";
import { authRepository } from "../features/auth/auth.repository";

// Interface do contexto de autenticação
interface AuthContextProps {
  user: UserSession;
  setUser: (user: UserSession) => void; // NOVO: expõe o setUser
  handleLogin: (payload: LoginRequest) => Promise<void>;
  handleLogout: () => void;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

// Interface do contexto de status da sessão
type SessionStatus = "checking" | "authenticated" | "anonymous";

interface SessionStatusContextProps {
  status: SessionStatus;
  reloadSession: () => Promise<void>;
  sessionError: string | null;
}

export const SessionStatusContext = createContext<SessionStatusContextProps>({
  status: "checking",
  reloadSession: async () => {},
  sessionError: null,
});

// Props do provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserSession>(emptySession);
  const [status, setStatus] = useState<SessionStatus>("checking");
  const [loading, setLoading] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // Função para recarregar a sessão
  async function reloadSession() {
    setStatus("checking");
    setSessionError(null);

    try {
      const checkedUser = await session.checkIn();
      if (checkedUser.id !== 0 && checkedUser.token) {
        setUser(checkedUser);
        setStatus("authenticated");
      } else {
        setUser(emptySession);
        setStatus("anonymous");
      }
    } catch (error) {
      console.error("Erro ao recarregar sessão:", error);
      setUser(emptySession);
      setStatus("anonymous");
      setSessionError("Erro ao verificar sessão");
    }
  }

  // Função de login
  async function handleLogin(payload: LoginRequest) {
    setLoading(true);
    setSessionError(null);

    try {
      const res = await authRepository.login(payload);
      
      // Salva no localStorage
      session.set({
        email: res.email,
        token: res.token,
      });

      // Atualiza o estado
      setUser({
        id: res.id,
        name: res.name,
        email: res.email,
        profilePicture: res.profilePicture ?? "",
        serviceOrders: res.serviceOrders,
        token: `Bearer ${res.token}`,
      });
      setStatus("authenticated");
    } catch (error) {
      console.error("Erro no login:", error);
      setSessionError("Credenciais inválidas");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Função de logout
  function handleLogout() {
    session.clear();
    setUser(emptySession);
    setStatus("anonymous");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // NOVO: agora disponível no contexto
        handleLogin,
        handleLogout,
        loading,
      }}
    >
      <SessionStatusContext.Provider
        value={{
          status,
          reloadSession,
          sessionError,
        }}
      >
        {children}
      </SessionStatusContext.Provider>
    </AuthContext.Provider>
  );
}

// Hooks para consumir os contextos
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export function useSessionStatus() {
  const context = useContext(SessionStatusContext);
  if (!context) {
    throw new Error("useSessionStatus deve ser usado dentro de um AuthProvider");
  }
  return context;
}
````

---

## Passo 2: Atualizar o `MainLayout` para usar o loader e sincronizar o contexto

````tsx
import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { NeogenNavbar } from "../components/navbar/NeogenNavbar";
import { useAuth } from "../contexts/AuthContext";
import { type UserSession, emptySession } from "../core/session";

export function MainLayout() {
  // Pega os dados retornados pelo authLoaderWithData
  const loaderData = useLoaderData() as UserSession | null;
  
  // Pega o setUser do contexto
  const { setUser } = useAuth();

  // Quando o loader retornar dados, sincroniza com o contexto
  useEffect(() => {
    if (loaderData && loaderData.id !== 0) {
      setUser(loaderData);
    } else {
      setUser(emptySession);
    }
  }, [loaderData, setUser]);

  return (
    <>
      <NeogenNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
````

---

## Passo 3: Atualizar o `authLoaderWithData` para retornar `null` em vez de redirecionar

````typescript
import { session, emptySession, type UserSession } from "../core/session";

/**
 * Loader de autenticação que verifica a sessão do usuário.
 * - Retorna o UserSession se a sessão for válida.
 * - Retorna null se a sessão for inválida (o componente deve tratar o redirecionamento).
 *
 * @param {Object} args - Argumentos fornecidos pelo React Router.
 * @param {Request} args.request - O objeto Request para a requisição da rota.
 * @returns {Promise<UserSession | null>} UserSession se autenticado, null caso contrário.
 */
export async function authLoaderWithData({ request }: { request: Request }): Promise<UserSession | null> {
  try {
    const checkedUser = await session.checkIn();

    // Se a sessão for inválida, retorna null (o componente tratará o redirecionamento)
    if (checkedUser.id === 0 || !checkedUser.token) {
      session.clear();
      return null;
    }

    // Se a sessão for válida, retorna o UserSession
    return checkedUser;

  } catch (e) {
    console.error("Erro no authLoaderWithData durante a checagem da sessão:", e);
    session.clear();
    return null;
  }
}
````

---

## Passo 4: Criar um hook `useRequireAuth` para os componentes protegidos

````typescript
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Hook para proteger componentes que requerem autenticação.
 * Redireciona para /login se o usuário não estiver autenticado.
 * 
 * @returns O objeto user do contexto de autenticação.
 */
export function useRequireAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se o user não está autenticado (id === 0 ou sem token), redireciona
    if (user.id === 0 || !user.token) {
      navigate(`/login?from=${encodeURIComponent(location.pathname)}`, { replace: true });
    }
  }, [user, navigate, location.pathname]);

  return user;
}
````

---

## Passo 5: Usar o hook nos componentes protegidos

Exemplo no `TechDashboard.tsx`:

````tsx
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { type ServiceOrder } from "../../features/serviceOrder/serviceOrder.types";

function TechDashboard() {
  // Hook que verifica autenticação e redireciona se necessário
  const user = useRequireAuth();

  // Se o user ainda não carregou (id === 0), mostra loading
  if (user.id === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Verificando autenticação...</p>
      </div>
    );
  }

  // Acessa as ordens de serviço do usuário autenticado
  const serviceOrders: ServiceOrder[] = user.serviceOrders;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold">Bem-vindo, {user.name}!</h1>
      <p className="text-slate-600">Email: {user.email}</p>

      <h2 className="mt-6 text-xl font-semibold">Suas Ordens de Serviço:</h2>
      
      {serviceOrders.length === 0 ? (
        <p className="text-slate-500 mt-2">Nenhuma ordem de serviço atribuída.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {serviceOrders.map((order) => (
            <li
              key={order.id}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <strong>OS #{order.id}:</strong> {order.description}
              <span className="ml-2 text-sm text-slate-500">
                Status: {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TechDashboard;
````

---

## Passo 6: Atualizar o `router.tsx`

````tsx
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import LoginPage from "./pages/login/Login";
import TechDashboardPage from "./pages/tech-dashboard/TechDashboard";
import CustomerRegisterPage from "./pages/customer-register/CustomerRegister";
import ServiceOrderCreatePage from "./pages/service-order-create/ServiceOrderCreate";
import TechRegisterPage from "./pages/tech-register/TechRegister";
import { authLoaderWithData } from "./utils/authLoaders";

export const router = createBrowserRouter([
  // Rotas PÚBLICAS (SEM MainLayout, SEM navbar)
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/technician/register",
    element: <TechRegisterPage />,
  },

  // Rotas PROTEGIDAS (COM MainLayout, COM navbar)
  {
    element: <MainLayout />,
    loader: authLoaderWithData, // Loader executa aqui para todas as rotas filhas
    children: [
      {
        path: "/",
        element: <TechDashboardPage />,
      },
      {
        path: "/technician/dashboard",
        element: <TechDashboardPage />,
      },
      {
        path: "/customer/register",
        element: <CustomerRegisterPage />,
      },
      {
        path: "/service-order/create",
        element: <ServiceOrderCreatePage />,
      },
    ],
  },

  // Rota 404
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-700">404 - Página não encontrada</h1>
      </div>
    ),
  },
]);
````

---

## Resumo do Fluxo

```
Usuário acessa /technician/dashboard
           ↓
    RouterProvider
           ↓
    authLoaderWithData executa
           ↓
    ┌──────┴──────┐
    ↓             ↓
 Sessão OK    Sessão Inválida
    ↓             ↓
 Retorna      Retorna null
 UserSession      ↓
    ↓         MainLayout recebe null
    ↓             ↓
 MainLayout   setUser(emptySession)
    ↓             ↓
 setUser(data)    ↓
    ↓         TechDashboard
    ↓             ↓
 TechDashboard   useRequireAuth()
    ↓             ↓
 Renderiza    Detecta user.id === 0
 conteúdo         ↓
              navigate("/login")
```

---

## Vantagens dessa abordagem

| Aspecto | Benefício |
|---------|-----------|
| **Centralização** | O loader roda uma vez no `MainLayout`, não em cada rota |
| **Sincronização** | O contexto `AuthContext` sempre tem o estado atualizado |
| **Flexibilidade** | Cada componente decide como tratar usuário não autenticado |
| **Reutilização** | O hook `useRequireAuth` pode ser usado em qualquer componente |
| **UX** | Componentes podem mostrar "Carregando..." antes do redirect |

Quer que eu atualize o `GUIAGUARD.md` com essa nova abordagem?


