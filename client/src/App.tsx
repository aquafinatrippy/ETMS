import React from 'react';
import './App.css';
import Login from './views/login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Register from './views/register';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Redirect from={"/"} to={"/login"} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
