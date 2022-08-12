import React, { useState, useEffect } from "react";
import User from "../components/user";
import API from "../api/";
import { paginate } from "../utils/paginate";
import Grouplist from "./grouplist";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const pageSize = 4;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const filteredUsers = selectedProf
        ? allUsers.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

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

            {count > 0 && (
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Ім'я</th>
                                <th scope="col">Якості</th>
                                <th scope="col">Професія</th>
                                <th scope="col">Зустрілися, разів</th>
                                <th scope="col">Оцінка</th>
                                <th scope="col">Вибране</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User {...user} key={user._id} {...rest} />
                            ))}
                        </tbody>
                    </table>
                </div>
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
};

export default Users;
