import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <div>Завантаження...</div>;
};

export default Logout;
