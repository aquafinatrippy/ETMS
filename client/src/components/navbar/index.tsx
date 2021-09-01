import React, {FC} from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {useStyles} from "./styles";
import axios from "axios";

export const Navbar: FC = () => {
    const classes = useStyles();

    const logoutHandle = async () => {
        document.cookie = 'access-token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/';
        await axios.get("/api/auth/logout")
    }

    return (
        <AppBar position="static" >
            <Toolbar className={classes.navPosition}>

                <Typography variant="h6" >
                    ETMS
                </Typography>
                <Button color="inherit" onClick={logoutHandle}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}