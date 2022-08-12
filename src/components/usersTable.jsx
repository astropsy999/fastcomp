import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, onSort, currentSort, ...rest }) => {
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <div className="col">
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")} scope="col">
                            Ім'я
                        </th>
                        <th scope="col">Якості</th>
                        <th
                            onClick={() => handleSort("profession.name")}
                            scope="col"
                        >
                            Професія
                        </th>
                        <th
                            onClick={() => handleSort("completedMeetings")}
                            scope="col"
                        >
                            Зустрілися, разів
                        </th>
                        <th onClick={() => handleSort("rate")} scope="col">
                            Оцінка
                        </th>
                        <th onClick={() => handleSort("bookmark")} scope="col">
                            Вибране
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <User {...user} key={user._id} {...rest} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    currentSort: PropTypes.object
};

export default UserTable;
