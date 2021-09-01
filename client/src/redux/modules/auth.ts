import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {UserCredentials, UserState } from '../interfaces/user.interface';



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
        if(res.status === 200) return res.data.response
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
            // let data = await response.json();
            console.log('response', response.data);
            if (response.status === 200) {
                return response.data.user;
            } else {
                return thunkAPI.rejectWithValue(response);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogged = true
        },
        logout: state => {
            state.isLogged = false
        }
    },
    extraReducers: {
        [loginUser.fulfilled.type]: (state, { payload }) => {
            state.email = payload.email;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [loginUser.rejected.type]: (state, { payload }) => {
            console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.pending.type]: (state) => {
            state.isFetching = true;
        },
        [checkUser.fulfilled.type]: (state, {payload}) => {
            console.log(state)
            state.email = payload.email
            state.isLogged = true

        },
        [checkUser.rejected.type]: (state) => {
            console.log(state)
        }
    }
})

export const {login, logout} = authSlice.actions
export const authReducer = authSlice.reducer



// export const logout = () => async (dispatch: any) => {
//     document.cookie = 'access-token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     window.location.href = '/';
//     await axios.get("/api/auth/logout")
//     dispatch("user/LOGOUT");
// };