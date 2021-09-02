import React, {FC, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, CircularProgress} from '@material-ui/core';
import Copyright from "../../components/copyright/copyright";
import {useStyles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from '../../redux/modules/auth';
import { useHistory } from 'react-router-dom';
import {RootState} from "../../redux";


export const Login: FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    const logged = useSelector((state: RootState) => {
        return state.user.isLogged
    })
    const fetching = useSelector((state: RootState) => state.user.isFetching)



    const handleChange = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
       dispatch(loginUser({email, password}))
        if(logged){
            history.push("/")
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            {fetching && <CircularProgress/>}
            {!fetching &&  <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                        value={email}
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
                        value={password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent={"center"}>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>}

            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}