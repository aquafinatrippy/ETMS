import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RegisterCredentials, UserCredentials, UserState} from '../interfaces/user.interface';


const initialState: UserState = {
    email: "",
    isLogged: false,
    token: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
};

export const checkUser = createAsyncThunk(
    'users/userCheck',
    async (arg: void, thunkAPI) => {
        const res = await axios.get("/api/auth/user")
        console.log('res', res)
        if (res.status === 200) return res.data.response
        return thunkAPI.rejectWithValue(res.data)
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async ({email, password}: UserCredentials, thunkAPI) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password
            }, {withCredentials: true})
            console.log('response', response.data);
            if (response.status === 200) return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue("Check ur login credentials")
        }
    });

export const registerUser = createAsyncThunk("users/register",
    async ({email, password, name, surname}: RegisterCredentials, thunkAPI) => {
        try {
            const response = await axios.post("/api/auth/register", {
                email,
                password,
                name,
                surname
            }, {withCredentials: true})
            console.log('response', response.data);
            if (response.status === 200) {
                return response.data.user;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to register account")
        }
    }
)

export const logoutUser = createAsyncThunk("users/logout",
    async () => {
        document.cookie = 'access-token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/';
        const res = await axios.get("/api/auth/logout")
        return res.data
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.fulfilled.type]: (state, {payload}) => {
            state.email = payload.email;
            state.isFetching = false;
            state.isSuccess = true;
            state.isLogged = true
            return state;
        },
        [loginUser.rejected.type]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload
        },
        [loginUser.pending.type]: (state) => {
            state.isFetching = true;
        },
        [checkUser.fulfilled.type]: (state, {payload}) => {
            state.email = payload.email
            state.isFetching = false
            state.isLogged = true

        },
        [checkUser.rejected.type]: (state) => {
            state.isLogged = false
            state.isFetching = false
        },
        [checkUser.pending.type]: (state) => {
            state.isFetching = true
        },
        [logoutUser.fulfilled.type]: (state) => {
            state.isLogged = false
            state.email = ""
        },
        [registerUser.fulfilled.type]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [registerUser.pending.type]: (state) => {
            state.isFetching = true
        },
        [registerUser.rejected.type]: (state, {payload}) => {
            state.isLogged = false
            state.errorMessage = payload
        }
    }
})

export const authReducer = authSlice.reducer
