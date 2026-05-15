import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../adapters/auth";
import { useContext } from "../context";
import Loading from "../components/Loading";

export default function AuthCallback() {
    const { context, setContext } = useContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser().then(user => {
            setContext({
                darkMode: context.darkMode,
                user,
                lastUserCheck: user != null ? Date.now() : null,
            });

            navigate("/", { replace: true });
        });
    }, []);

    return <Loading loadingText="Logging in..." />;
}
