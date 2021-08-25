import {createConnection, getConnection} from "typeorm";
import database from "../config/testDb";
import TimelogController from "../controllers/timelog.controller";
import UserController from "../controllers/user.controller";
import {ITimeLogPayload} from "../interfaces/timelog.interface";


let userId: string;
let timelogId: string;
const userController = new UserController();
const timelogController = new TimelogController()



beforeEach(async () => {
    return createConnection(database);
});

afterEach(() => {
    let conn = getConnection();
    return conn.close();
})
test("Set user ID for test to use", async () => {
    const loginInfo = Object.create({
        email: "test@hot.ee",
        password: "secret1234"
    })
    const res = await userController.loginUser(loginInfo)
    userId = (res as any).id
    expect(true).toEqual(true)
})


describe("Timelog contoller success", () => {
    test("Submit single timelog", async () => {
        const exTimelog: ITimeLogPayload = {
            description: "test 1234, meeting at somewhere",
            userId
        }
        const res = await timelogController.submitTimelog(exTimelog, userId)
        timelogId = (res as any).id
        expect(res).toMatchObject(exTimelog)
    })

    test("Get user timelogs", async () => {
        const res = await timelogController.getAllTimelogs(userId)
        expect(res).toHaveLength(1)
    })

    test("Get user single timelog", async () => {
        const timelog: ITimeLogPayload = {
            description: "test 1234, meeting at somewhere",
            userId
        }
        const res = await timelogController.findTimelog(timelogId)
        expect(res).toMatchObject(timelog)
    })

    test("Edit timelog info", async () => {
        const newTimelogInfo: ITimeLogPayload = {
            description: "changed the plan",
            userId
        }
        const res = await timelogController.editTimelog(timelogId, newTimelogInfo)
        expect(res).toMatchObject(newTimelogInfo)
    })

    test("End timelog", async () => {
        const res = await timelogController.endTimelog(timelogId)
        expect(res).toMatchObject({
            description: "changed the plan",
            userId,
            end: new Date().toLocaleString()
        })
    })

    test("Delete timelog", async () => {
        const res = await timelogController.deleteTimelog(timelogId)
        expect(res).toEqual({message: "Deleted successfully"})
    })
})
