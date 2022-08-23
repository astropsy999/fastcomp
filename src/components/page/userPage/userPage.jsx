import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api";
import PropTypes from "prop-types";
import Comments from "../../common/comments/comments";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";

const UserPage = () => {
    const params = useParams();
    const [user, setUser] = useState();

    const { userId } = params;

    useEffect(() => {
        API.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    {user ? (
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard meetings={user.completedMeetings} />
                        </div>
                    ) : (
                        <h1>Завантаження</h1>
                    )}
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
