import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api";
import Qualities from "../../ui/qualities/qualitiesList";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserPage = () => {
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    const { userId } = params;

    useEffect(() => {
        API.users.getById(userId).then((data) => {
            setUser(data);
        });
    });

    const handleAllUsers = () => {
        history.push("/users");
    };

    return (
        <>
            {user ? (
                <div className="col-md-4 m-4">
                    <h1>{user.name}</h1>
                    <h3>Професія: {user.profession.name}</h3>
                    <div>
                        <Qualities qualities={user.qualities} />
                    </div>
                    <div>Всього зустрічей: {user.completedMeetings}</div>
                    <div>Оцінка: {user.rate}</div>
                    <button
                        className="btn btn-success"
                        onClick={handleAllUsers}
                    >
                        Усі користувачі
                    </button>
                </div>
            ) : (
                <h1>Завантаження</h1>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
