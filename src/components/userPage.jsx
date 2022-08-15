import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = () => {
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    const { userId } = params;

    API.users.getById(userId).then((resolve) => {
        setUser(resolve);
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
                        <QualitiesList qualities={user.qualities} />
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

export default UserPage;
