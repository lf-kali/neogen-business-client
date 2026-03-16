import { redirect } from "react-router-dom";
import { session, type UserSession } from "../core/session";

export async function authLoaderWithData({request}: {request: Request}): Promise<UserSession | null> {
    const currentPath = new URL(request.url).pathname;

    try {
        const checkedUser = await session.checkIn();

        if (checkedUser.id === 0 || !checkedUser.token) {
            session.clear();
            return null;
        }

        return checkedUser;
    }
    catch (e) {
        console.error("Erro no authLoaderWithData durante a checagem da sessão:", e);
        session.clear();
        return null;
    }
}