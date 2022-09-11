import React from "react";
import PropTypes from "prop-types";
import Comments from "../../common/comments/comments";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import { useSelector } from "react-redux";
import { getUsersById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUsersById(userId));

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard meetings={user.completedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Завантаження...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
