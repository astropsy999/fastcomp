import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "../navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Головна
                        </Link>
                    </li>
                    <li className="nav-item"></li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/users"
                            >
                                Користувачі
                            </Link>
                        </li>
                    )}
                </ul>
                {currentUser ? (
                    <div className="d-flex">
                        <NavProfile />
                    </div>
                ) : (
                    <Link className="nav-link" aria-current="page" to="/login">
                        Логін
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
