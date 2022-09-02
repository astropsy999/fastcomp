import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="rounded-circle img-responsive"
                    height="35"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? "show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Профіль
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Вийти
                </Link>
            </div>
        </div>
    );
};

NavProfile.propTypes = {
    name: PropTypes.string
};

export default NavProfile;
