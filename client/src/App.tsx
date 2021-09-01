import React, {useEffect} from 'react';
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
import ProtectedRoute  from './hooks/privateRoute';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux";
import {checkUser} from "./redux/modules/auth";


function App() {
    const dispatch = useDispatch()
    const checklogStatus: boolean | null = useSelector((state: RootState) => {
        return state.user.isLogged
    })
    dispatch(checkUser())
    useEffect(() => {
        dispatch(checkUser)
    }, [dispatch])
    //
    //
    // console.log(checklogStatus)

    return (
        <Router>
            <div className="App">
                {/*{logged ? <Navbar/> : <></>}*/}
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <ProtectedRoute
                        authenticationPath='/login'
                        component={Dashboard}
                    />

                    <Redirect from={"/"} to={"/login"} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
