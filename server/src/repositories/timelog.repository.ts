import {TimeLog} from "../models/timelog.entity";
import {getRepository} from "typeorm";
import {Feedback} from "../interfaces/user.interface";




export const getAllTimelogs = async (userId: string): Promise<TimeLog[] | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const timelogs = await timelogRepository.find({where: {userId}})
        return timelogs
    }catch (e) {
       return {message: "No timelogs found"}
    }



}