import {getRepository} from "typeorm";
import {User} from "../models/user"
import * as bcrypt from 'bcryptjs'

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

export const loginUser = async (payload: ILoginPayload): Promise<any> => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({email: payload.email})
    if (!user) return null
    const passwordMatching = await bcrypt.compare(payload.password, user.password)
    if (passwordMatching) {
        return user
    } else {
        return {message: "password is incorrect"}
    }
}

export const createUser = async (payload: IUserPayload): Promise<User> => {
    try {
        const userRepository = getRepository(User);
        const user = new User()
        payload.password = await bcrypt.hash(payload.password, 8)

        return userRepository.save({
            ...user,
            ...payload
        })
    } catch (err) {
        return err
    }
}
