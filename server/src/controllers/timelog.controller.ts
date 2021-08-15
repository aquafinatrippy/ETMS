import {Body, Post, Get, Route, Tags} from "tsoa";
import {TimeLog} from "../models/timelog.entity";
import { getAllTimelogs } from "../repositories/timelog.repository";
import {Feedback} from "../interfaces/user.interface";


@Route("timelog")
@Tags("Timelog")
export default class TimelogController{
    @Get("/times/:userId")
    public async getAllTimelogs(userId: string): Promise<TimeLog[] | Feedback>{
        return getAllTimelogs(userId)
    }
}