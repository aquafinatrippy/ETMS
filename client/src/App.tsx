import React from 'react';
import './App.css';
import {Login} from './views/login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {Register} from './views/register';
import {Dashboard} from './views/dashboard';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux";
import {checkUser} from "./redux/modules/auth";
import {Navbar} from "./components/navbar";


function App() {
    const dispatch = useDispatch()
    const checklogStatus: boolean | null = useSelector((state: RootState) => {
        return state.user.isLogged
    })
    dispatch(checkUser())

     return (
        <Router>
            <div className="App">
                <Switch>
                    {!checklogStatus ? (
                        <>
                            <Redirect to={"/login"}/>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/register">
                                <Register/>
                            </Route></>
                    ) : (
                        <>
                            <Redirect to={"/"} from={"**"}/>
                            <Redirect to={"/"}/>
                            <Navbar/>
                            <Route path={"/"}>
                                <Dashboard/>
                            </Route>
                        </>

                    )}


                    <Redirect from={"/"} to={"/login"}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
