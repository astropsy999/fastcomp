import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./components/users";
import UserPage from "./components/userPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/users/" component={Users} />
                <Route exact path="/users/:userId" component={UserPage} />
                <Route exact path="/" component={Main} />
            </Switch>
        </>
    );
}

export default App;
