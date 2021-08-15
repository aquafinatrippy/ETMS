import {Body, Post, Route, Tags} from "tsoa";
import {createUser, loginUser} from "../repositories/user.repository";
import {User} from "../models/user.entity";
import {Feedback, ILoginPayload, IUserPayload} from "../interfaces/user.interface";


@Route("users")
@Tags("User")
export default class UserController {
    @Post("/register")
    public async createUser(@Body() body: IUserPayload): Promise<User> {
        return createUser(body)
    }
    @Post("/login")
    public async loginUser(@Body() body: ILoginPayload): Promise<User | Feedback>{
        return loginUser(body)
    }
}