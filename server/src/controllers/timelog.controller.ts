import {Body, Post, Get, Route, Tags, Patch, Path} from "tsoa";
import {TimeLog} from "../models/timelog.entity";
import {endTimelog, findTimelog, getAllTimelogs, submitTimelog} from "../services/timelog.service";
import {Feedback} from "../interfaces/user.interface";
import {ITimeLogPayload} from "../interfaces/timelog.interface";


@Route("timelog")
@Tags("Timelog")
export default class TimelogController{
    @Get("/times/{userId}")
    public async getAllTimelogs(userId: string): Promise<TimeLog[] | Feedback>{
        return getAllTimelogs(userId)
    }
    @Post("/submit/{userId}")
    public async submitTimelog(@Body() body: ITimeLogPayload, userId: string): Promise<ITimeLogPayload | Feedback>{
        return submitTimelog(body, userId)
    }
    @Get("/{timelogId}")
    public async findTimelog(timelogId: string): Promise<ITimeLogPayload | Feedback>{
        return findTimelog(timelogId)
    }
    @Patch("/end/{timelogId}")
    public async endTimelog(@Path() timelogId: string, @Body() end_timelog: Date): Promise<ITimeLogPayload | Feedback>{
        return endTimelog(timelogId, end_timelog)
    }

}