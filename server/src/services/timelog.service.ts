import {TimeLog} from "../models/timelog.entity";
import {getRepository} from "typeorm";
import {Feedback} from "../interfaces/user.interface";
import {ITimeLogPayload} from "../interfaces/timelog.interface";
import moment from 'moment';


export const getAllTimelogs = async (userId: string): Promise<TimeLog[] | Feedback> => {
    try {

        const timelogRepository = getRepository(TimeLog)
        const timelogs = await timelogRepository.find({where: {userId}})
        return timelogs
    } catch (e) {
        return {message: "No time logs found"}
    }
}

export const submitTimelog = async (payload: ITimeLogPayload, userId: string): Promise<ITimeLogPayload | Feedback> => {
    try {
        let overlap: boolean = false
        const timelogRepository = getRepository(TimeLog)
        const unfinishedTimelogs = await timelogRepository.findAndCount({where: {end: null, userId}})
        if(unfinishedTimelogs[1] >= 1) return {message: "You have unfinished time logs, be sure to end previous one before submitting new"}
        const time_logs = await timelogRepository.find({where: {userId}})
        time_logs.forEach(time_log => {
            console.log(moment(payload.start).isBetween(time_log.start, time_log.end))
            if(moment(payload.start).isBetween(time_log.start, time_log.end)) {
                overlap = true
            }
        })
        if(overlap) return {message: "Time log is overlapping, cant submit."}
        const timelog = new TimeLog();
        return timelogRepository.save({
            ...timelog,
            ...payload,
            userId
        })
    } catch (e) {
        return {message: "Failed to submit time log"}
    }
}

export const findTimelog = async (timelogId: string): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const found = await timelogRepository.findOne({where: {id: timelogId}})
        if(!found) return {message: "Timelog was not found"}
        return found
    }catch (e) {
        return {message: "Time log was not found"}
    }
}

export const endTimelog = async (timelogId: string): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepository = getRepository(TimeLog)
        const timelog = await timelogRepository.findOne({where: {id: timelogId, end: null}})
        if(!timelog) return {message: "Timelog was not found or end time is set"}
        return await timelogRepository.save({
            ...timelog,
            end: new Date().toLocaleString()
        })
    }catch (e) {
        return {message: "Failed to end timelog"}
    }
}

export const deleteTimelog = async (timelog_id: string): Promise<Feedback> => {
    try {
        const timelogRepo = getRepository(TimeLog)
        const time = await getRepository(TimeLog).findOne({
            where:
                {
                    id: timelog_id
                }
        })
        if (!time) {
            return {message: "not found"}
        } else {
            await timelogRepo.remove(time)
            return {message: "Deleted successfully"}
        }
    } catch
        (e) {
        return {message: "Failed to delete timelog"}
    }
}

export const editTimelog = async (timelog_id: string, payload: ITimeLogPayload): Promise<ITimeLogPayload | Feedback> => {
    try {
        const timelogRepo = getRepository(TimeLog)
        const found = await timelogRepo.findOne({where: {id: timelog_id, end: null}})
        if(!found) return {message: "Timelog was not found or is not ended"}
        return await timelogRepo.save({
            ...found,
            ...payload
        })
    }catch (e) {
        return {message: "Failed to edit timelog"}
    }
}

