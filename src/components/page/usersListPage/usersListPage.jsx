import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { paginate } from "../../../utils/paginate";
import Grouplist from "../../common/grouplist";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
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

    const pageSize = 6;

    const { users } = useUser();

    const handleDelete = (useIid) => {
        console.log("useIid: ", useIid);
        // const searchedUsers = users.filter((u) => u._id !== id);
        // setUsers(searchedUsers);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log("newArray: ", newArray);
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
                <div className="col-md-9">
                    <input
                        className="m-2 mr-2 w-100"
                        type="text"
                        name="searchQuery"
                        placeholder="Знайти..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                </div>
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
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
