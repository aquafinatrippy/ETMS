import {getRepository} from "typeorm";
import {User} from "../models/user"
import * as bcrypt from 'bcryptjs'

export interface IUserPayload{
    email: string;
    name: string;
    surname: string;
    password: string;
}

export const createUser = async (payload: IUserPayload): Promise<User> => {
    const userRepository = getRepository(User);
    const user = new User()
    payload.password = await bcrypt.hash(payload.password, 8)

    return userRepository.save({
        ...user,
        ...payload
    })
}