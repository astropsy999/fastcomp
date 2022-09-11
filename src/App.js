import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route exact path="/login/:type?" component={Login} />
                    <Route exact path="/" component={Main} />
                    <Route exact path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;
