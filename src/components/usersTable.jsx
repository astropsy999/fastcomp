import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Ім'я" },
        qualities: {
            name: "Якості",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Професія" },
        completedMeetings: { path: "completedMeetings", name: "Зустрічей" },
        rate: { path: "rate", name: "Рейтинг" },
        bookmark: {
            path: "bookmark",
            name: "Вибране",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            )
        }
    };
    return (
        <div className="col">
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={users}
            />
        </div>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onToggleBookMark: PropTypes.func,
    onDelete: PropTypes.func
};

export default UserTable;
