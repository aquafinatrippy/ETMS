import {Body, Post, Route, Tags } from "tsoa";
import {createUser, IUserPayload} from "../repositories/user";
import {User} from "../models/user";



@Route("users")
@Tags("User")
export default class UserController{
   @Post("/")
   public async createUser(@Body() body: IUserPayload): Promise<User> {
       return createUser(body)
   }
}