import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api";
import { paginate } from "../utils/paginate";
import Grouplist from "./grouplist";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (id) => {
        const searchedUsers = users.filter((u) => u._id !== id);
        setUsers(searchedUsers);
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") {
            setSearchQuery("");
        }
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="row">
                <SearchStatus length={count} />
                <input
                    className="m-2 mr-2 w-100"
                    type="text"
                    name="searchQuery"
                    placeholder="Знайти..."
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />

                {professions && (
                    <div className="col-md-2">
                        <Grouplist
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn m-2 btn-success"
                            onClick={clearFilter}
                        >
                            Усі професії
                        </button>
                    </div>
                )}

                {count > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    }
    return "Завантаження...";
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
