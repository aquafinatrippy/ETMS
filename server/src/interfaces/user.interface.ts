export interface Feedback {
    message: string;
}

export interface IUserPayload {
    email: string;
    name: string;
    surname: string;
    password: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}