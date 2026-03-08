import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const useHome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "l") {
            navigate("login");
        }
        if (e.key === "w") {
            navigate("workspace");
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);

    const handleGetStarted = () => {
        navigate("workspace");
    };

    const handleSignIn = () => {
        navigate("login");
    };

    return {
        isLoggedIn,
        handleGetStarted,
        handleSignIn
    };
}