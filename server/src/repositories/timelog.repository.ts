import {TimeLog} from "../models/timelog.entity";
import {getRepository} from "typeorm";
import {Feedback} from "../interfaces/user.interface";
import {ITimeLogPayload} from "../interfaces/timelog.interface";


export const getAllTimelogs = async (userId: string): Promise<TimeLog[] | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const timelogs = await timelogRepository.find({where: {userId}})
        return timelogs
    } catch (e) {
        return {message: "No timelogs found"}
    }
}

export const submitTimelog = async (payload: ITimeLogPayload, userId: string): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const timelog = new TimeLog();
        return timelogRepository.save({
            ...timelog,
            ...payload,
            userId
        })
    } catch (e) {
        return {message: "failed to submit timelog"}
    }
}