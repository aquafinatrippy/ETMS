import {Body, Get, Post, Route, Tags, Request} from "tsoa";
import {createUser, currentUser, loginUser} from "../services/user.service";
import {User} from "../models/user.entity";
import {Feedback, ILoginPayload, IUserPayload} from "../interfaces/user.interface";


@Route("/api/auth")
@Tags("Auth")
export default class UserController {
    @Post("/register")
    public async createUser(@Body() body: IUserPayload): Promise<User | Feedback> {
        return createUser(body)
    }
    @Post("/login")
    public async loginUser(@Body() body: ILoginPayload): Promise<User | Feedback>{
        return loginUser(body)
    }
    @Get("/user")
    public async currentUser(@Request() id: string): Promise< User | Feedback>{
        return currentUser(id)
    }
}