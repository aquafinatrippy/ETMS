import {Redirect, Route, RouteProps} from 'react-router';
import axios from "axios";

export type ProtectedRouteProps = {
    authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({authenticationPath, ...routeProps}: ProtectedRouteProps) {
    let auth = false
    const checkUser = async () => {
        const {data} = await axios.get("/api/auth/user")
        console.log(data.response.message)
        if (data.response.message === "Authenticated") {
            return true
        } else {
            return false

        }
    }
    console.log(checkUser())
    // checkUser()

    if (auth) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{pathname: authenticationPath}}/>;
    }
};