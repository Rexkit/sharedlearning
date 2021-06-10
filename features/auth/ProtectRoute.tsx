import { useAuth } from "../../utils/hooks/useAuth";
import { useRouter } from "next/router";

export const ProtectRoute = ({ children }) => {
    const { user } = useAuth();

    if (typeof window !== "undefined") {
        const Router = useRouter();

        if (!user.me && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            Router.replace("/login");
            return null;
        }

        return children;
    }

    return null;
};