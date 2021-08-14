import {Body, Post, Route, Tags} from "tsoa";
import {createUser, ILoginPayload, IUserPayload, loginUser} from "../repositories/user";
import {User} from "../models/user";


@Route("users")
@Tags("User")
export default class UserController {
    @Post("/register")
    public async createUser(@Body() body: IUserPayload): Promise<User> {
        return createUser(body)
    }
    @Post("/login")
    public async loginUser(@Body() body: ILoginPayload): Promise<any>{
        return loginUser(body)
    }
}