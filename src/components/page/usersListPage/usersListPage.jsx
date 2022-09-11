import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Grouplist from "../../common/grouplist";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const pageSize = 6;

    const users = useSelector(getUsersList());

    const handleDelete = (useIid) => {
        console.log("useIid: ", useIid);
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

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : data;

        return filteredUsers.filter((u) => u._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <div className="row">
            <SearchStatus length={count} />

            {!professionLoading && (
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
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
