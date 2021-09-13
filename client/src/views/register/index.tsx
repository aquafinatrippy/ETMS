import React, {FC, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import Copyright from "../../components/copyright/copyright";
import {useStyles} from "./styles";
import {RegisterCredentials} from "../../redux/interfaces/user.interface";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/modules/auth";


export const Register: FC = () =>  {
    const classes = useStyles();
    const [user, setUser] = useState<RegisterCredentials>({name: "", surname: "", password: "", email: ""})
    const dispatch = useDispatch()

    const handleChange = (e: any) => {
        switch (e.target.name){
            case 'email':
                setUser({...user ,email: e.target.value})
                break;
            case 'password':
                setUser({...user ,password: e.target.value})
                break;
            case 'name':
                setUser({...user ,name: e.target.value})
                break;
            case 'surname':
                setUser({...user ,surname: e.target.value})
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(registerUser(user))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    User registration
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First name"
                        name="name"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="sname"
                        label="Surname"
                        name="surname"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent={"center"}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"You already have account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}