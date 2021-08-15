import {Body, Post, Get, Route, Tags} from "tsoa";
import {TimeLog} from "../models/timelog.entity";
import {getAllTimelogs, submitTimelog} from "../repositories/timelog.repository";
import {Feedback} from "../interfaces/user.interface";
import {ITimeLogPayload} from "../interfaces/timelog.interface";


@Route("timelog")
@Tags("Timelog")
export default class TimelogController{
    @Get("/times/:userId")
    public async getAllTimelogs(userId: string): Promise<TimeLog[] | Feedback>{
        return getAllTimelogs(userId)
    }
    @Post("/submit/:userId")
    public async submitTimelog(@Body() body: ITimeLogPayload, userId: string): Promise<ITimeLogPayload | Feedback>{
        return submitTimelog(body, userId)
    }

}