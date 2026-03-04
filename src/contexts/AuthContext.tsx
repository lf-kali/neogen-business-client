import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { emptySession, session, type UserSession } from "../core/session";
import type { LoginRequest } from "../features/auth/auth.types";
import { useLogin } from "../features/auth/useLogin";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
    user: UserSession;
    handleLogout(): void;
    handleLogin(payload: LoginRequest): Promise<void>;
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
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("checking");
    const [sessionError, setSessionError] = useState<unknown | null>(null);

    const {login, loading: loginLoading} = useLogin();

    const ranOnceRef = useRef(false)

    const reloadSession = async () => {
        setSessionStatus("checking");
        setSessionError(null);

        try {
            const checkedUser = await session.checkIn();
            if (checkedUser.id === 0 || !checkedUser.token) {
                session.clear();
                setUser(emptySession);
                setSessionStatus("anonymous");
            }
            else {
                setUser(checkedUser);
                setSessionStatus("authenticated");
            }
        }
        catch (e) {
            console.error("Erro ao verificar sessão no localStorage:", e)
            session.clear();
            setUser(emptySession);
            setSessionStatus("anonymous");
            setSessionError(e);
        }
    };

    useEffect(() => {
        if (ranOnceRef.current) return;
        ranOnceRef.current = true;
        void reloadSession();
    }, []);

    async function handleLogin(payload: LoginRequest) {
        try {
            const res = await login(payload);
            setUser(res);
            setSessionStatus("authenticated");
            // return res;
        } 
        catch (error) {
            alert("Erro ao fazer login!");
            console.error(error);
            setUser(emptySession);
            setSessionStatus("anonymous");
            throw error;
        }
    }

    function handleLogout() {
        setUser(emptySession);
        setSessionStatus("anonymous");
        session.clear();
    }

    const authContextValue = useMemo(
        () => ({user , handleLogin, handleLogout, loading: loginLoading}),
        [user, handleLogin, handleLogout, loginLoading]
    )

    const sessionStatusContextValue = useMemo(
        () => ({status: sessionStatus, reloadSession, sessionError}),
        [sessionStatus, reloadSession, sessionError]
    )

    return (
        <>
            <AuthContext.Provider value={authContextValue}>
                <SessionStatusContext.Provider value = {sessionStatusContextValue}>
                    {children}
                </SessionStatusContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);
export const useSessionStatus = () => useContext(SessionStatusContext)

