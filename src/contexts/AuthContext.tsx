import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { emptySession, session, type UserSession } from "../core/session";
import type { LoginRequest } from "../features/auth/auth.types";
import { authRepository } from "../features/auth/auth.repository";

interface AuthContextProps {
    user: UserSession;
    setUser: (user: UserSession) => void;
    handleLogin(payload: LoginRequest): Promise<void>;
    handleLogout(): void;
    loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

type SessionStatus = "checking" | "authenticated" | "anonymous";

interface SessionStatusContextProps {
    status: SessionStatus;
    reloadSession(): Promise<void>;
    sessionError: unknown | null;
}

export const SessionStatusContext = createContext<SessionStatusContextProps>({
    status: "checking",
    reloadSession: async () => {},
    sessionError: null,
})

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserSession>(emptySession);
    const [status, setStatus] = useState<SessionStatus>("checking");
    const [sessionError, setSessionError] = useState<unknown | null>(null);

    const [loading, setLoading] = useState(false);

    const ranOnceRef = useRef(false)

    const reloadSession = async () => {
        setStatus("checking");
        setSessionError(null);

        try {
            const checkedUser = await session.checkIn();
            if (checkedUser.id !== 0 && checkedUser.token) {
                setUser(checkedUser);
                setStatus("authenticated");
            }
            else {
                session.clear();
                setUser(emptySession);
                setStatus("anonymous");
            }
        }
        catch (e) {
            console.error("Erro ao recarregar sessão:", e)
            session.clear();
            setUser(emptySession);
            setStatus("anonymous");
            setSessionError(e);
        }
    };

    useEffect(() => {
        if (ranOnceRef.current) return;
        ranOnceRef.current = true;
        void reloadSession();
    }, []);

    async function handleLogin(payload: LoginRequest) {
        setLoading(true);
        setSessionError(null);

        try {
            const res = await authRepository.login(payload);
            session.store(res.email, res.token);
            setUser({
                id: res.id,
                name: res.name,
                email: res.email,
                profilePicture: res.profilePicture,
                serviceOrders: res.serviceOrders,
                token: `Bearer ${res.token}`
            });
            setStatus("authenticated");
        } 
        catch (error) {
            alert("Erro ao fazer login!");
            console.error(error);
            setSessionError("Credenciais inválidas");
            setUser(emptySession);
            setStatus("anonymous");
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        session.clear();
        setUser(emptySession);
        setStatus("anonymous");
    }

    return (
        <>
            <AuthContext.Provider value={{
                user,
                setUser,
                handleLogin,
                handleLogout,
                loading,
            }}>
                <SessionStatusContext.Provider value = {{
                    status,
                    reloadSession,
                    sessionError,
                }}>
                    {children}
                </SessionStatusContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);
export const useSessionStatus = () => useContext(SessionStatusContext)

