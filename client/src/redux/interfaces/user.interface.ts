export interface UserState {
    email: string;
    isLogged: boolean;
    token: string;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

export interface UserCredentials {
    password?: string;
    email: string
}

export interface RegisterCredentials{
    name: string,
    surname: string,
    email: string,
    password: string
}