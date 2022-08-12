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
    onBook
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
                <button
                    className={`btn btn-${!bookmark ? "warning" : "success"}`}
                    onClick={() => onBook(_id)}
                >
                    {!bookmark ? (
                        <i className="bi bi-bookmark"></i>
                    ) : (
                        <i className="bi bi-bookmark-check-fill"></i>
                    )}
                </button>
            </td>
            <td>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Видалити
                </button>
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
