import { useAuth } from "../../utils/hooks/useAuth";
import { useRouter } from "next/router";

export const ProtectRoute = ({ children }) => {
    const { user } = useAuth();

    if (typeof window !== "undefined") {
        const Router = useRouter();

        if (window.location.pathname.includes('/pages/')) {
            return children;
        }

        if (!user.me && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            Router.replace("/login");
            return null;
        }

        return children;
    }

    return null;
};