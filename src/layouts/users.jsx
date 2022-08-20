import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditForm from "../components/ui/userEditForm";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    console.log("params: ", params);
    return (
        <>
            {userId ? (
                edit ? (
                    <UserEditForm />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
