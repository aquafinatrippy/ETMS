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
        return {message: "Failed to submit timelog"}
    }
}

export const findTimelog = async (timelogId: string): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const found = await timelogRepository.findOne({where: {id: timelogId}})
        if(!found) return {message: "Timelog was not found"}
        return found
    }catch (e) {
        return {message: "Timelog was not found"}
    }
}

export const endTimelog = async (timelogId: string, end_timelog: Date): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const timelog = await timelogRepository.findOne({where: {id: timelogId, end: null}})
        if(!timelog) return {message: "Timelog was not found"}
        return await timelogRepository.save({
            ...timelog,
            end: end_timelog
        })
    }catch (e) {
        return {message: "Failed to end timelog"}
    }
}

// export const deleteTimelog = async (timelog_id: string): Promise<Feedback> => {
//     try {
//         const timelogRepo = getRepository(TimeLog)
//
//         const time = await getRepository(TimeLog).findOne({
//             where:
//                 {
//                     id: timelog_id
//                 }
//         })
//         if (!time) {
//             return {message: "not found"}
//         } else {
//             await timelogRepo.remove(time)
//             return {message: "Deleted successfully"}
//         }
//     } catch
//         (e) {
//         return {message: "Failed to delete timelog"}
//     }
// }

