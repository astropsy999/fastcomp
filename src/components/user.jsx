import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((q) => (
                    <Qualitie q={q} key={q._id} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                {/* <BookMark
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
                /> */}
            </td>
            <td>
                {/* <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    X
                </button> */}
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    qualities: PropTypes.array,
    profession: PropTypes.object,
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    onBook: PropTypes.func.isRequired
};

export default User;
