import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";


export function useRequireAuth() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (user.id === 0 || !user.token) {
            navigate(`/login?from=${encodeURIComponent(location.pathname)}`, {replace: true});
        }
    }, [user, navigate, location.pathname]);

    return user;
}