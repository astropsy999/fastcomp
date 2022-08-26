import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            exact
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route exact path="/" component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
}

export default App;
