import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                    Головна
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">
                    Логін
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/users">
                    Користувачі
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
