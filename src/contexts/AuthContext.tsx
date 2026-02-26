import { createContext, useState, type ReactNode } from "react";
import { emptySession, session, type UserSession } from "../core/session";
import type { LoginRequest } from "../features/auth/auth.types";
import { useLogin } from "../features/auth/useLogin";

interface AuthContextProps {
    user: UserSession;
    handleLogout(): void;
    handleLogin(payload: LoginRequest): Promise<void>;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserSession>(emptySession)

    const {login, loading} = useLogin()

    async function handleLogin(payload: LoginRequest) {
        try {
            const res = await login(payload);
            setUser(res);
        } 
        catch (error) {
            alert("Erro ao fazer login!");
            console.error(error);
        }
        console.log(user);
    }

    function handleLogout() {
        setUser(emptySession);
        session.clear();
    }

    return (
        <>
            <AuthContext.Provider
                value={{user, handleLogin, handleLogout, loading}}
            >
                {children}
            </AuthContext.Provider>
        </>
    )
}

