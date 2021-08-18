import {Body, Post, Get, Route, Tags, Patch, Path, Delete, Security, Request, Hidden } from "tsoa";
import * as express from "express";
import {TimeLog} from "../models/timelog.entity";
import {
    deleteTimelog,
    editTimelog,
    endTimelog,
    findTimelog,
    getAllTimelogs,
    submitTimelog
} from "../services/timelog.service";
import {Feedback} from "../interfaces/user.interface";
import {ITimeLogPayload} from "../interfaces/timelog.interface";


@Route("/api/timelog")
@Tags("Timelog")
export default class TimelogController{
    @Security("jwt", ["user"])
    @Get("/times")
    public async getAllTimelogs(@Request() userId: string): Promise<TimeLog[] | Feedback>{
        return getAllTimelogs(userId)
    }

    @Security("jwt", ["user"])
    @Post("/submit")
    public async submitTimelog(@Body() body: ITimeLogPayload, @Request() userId: string): Promise<ITimeLogPayload | Feedback>{
        return submitTimelog(body, userId)
    }

    @Security("jwt", ["user"])
    @Get("/{timelogId}")
    public async findTimelog(@Path() timelogId: string): Promise<ITimeLogPayload | Feedback>{
        return findTimelog(timelogId)
    }

    @Security("jwt", ["user"])
    @Patch("/end/{timelogId}")
    public async endTimelog(@Path() timelogId: string): Promise<ITimeLogPayload | Feedback>{
        return endTimelog(timelogId)
    }

    @Security("jwt", ["user"])
    @Delete("/{timelogId}")
    public async deleteTimelog(@Path() timelogId: string): Promise<any>{
        return deleteTimelog(timelogId)
    }

    @Security("jwt", ["user"])
    @Patch("/edit/{timelogId}")
    public async editTimelog(@Path() timelogId: string, @Body() body: ITimeLogPayload): Promise<ITimeLogPayload | Feedback>{
        return editTimelog(timelogId, body)
    }

}