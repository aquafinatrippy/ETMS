import React, {FC} from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {useStyles} from "./styles";
import {logoutUser} from "../../redux/modules/auth";
import {useDispatch} from "react-redux";

export const Navbar: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const logoutHandle = () => {
        dispatch(logoutUser())
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