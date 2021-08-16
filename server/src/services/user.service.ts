import {getRepository} from "typeorm";
import {User} from "../models/user.entity"
import * as bcrypt from 'bcryptjs'
import {Feedback, ILoginPayload, IUserPayload} from "../interfaces/user.interface";

export const loginUser = async (payload: ILoginPayload): Promise<User | Feedback> => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({email: payload.email})
    if (!user) return {message: "User not found"}
    const passwordMatching = await bcrypt.compare(payload.password, user.password)
    if (passwordMatching) {
        return user
    } else {
        return {message: "password is incorrect"}
    }
}

export const createUser = async (payload: IUserPayload): Promise<User | Feedback> => {
    try {
        const userRepository = getRepository(User);
        const user = new User()
        payload.password = await bcrypt.hash(payload.password, 8)

        return userRepository.save({
            ...user,
            ...payload
        })
    } catch (err) {
        return {message: err}
    }
}
