import UserController from "../controllers/user.controller";
import {createConnection, getConnection} from "typeorm";
import database from '../config/testDb'
import {ILoginPayload, IUserPayload} from "../interfaces/user.interface";


beforeEach(() => {
    return createConnection(database);
});

afterEach(() => {
    let conn = getConnection();
    return conn.close();
});


const controller = new UserController();
describe("User controller", () => {
    test("Registering a user", async () => {
        const bodyOfRes: IUserPayload = {
            name: "test",
            surname: "test 2",
            email: "test@hot.ee",
            password: "secret1234"
        }
        const response = await controller.createUser(bodyOfRes)
        expect(response).toMatchObject(bodyOfRes)
    })

    test("Login user", async () => {
        const loginInfo = Object.create({
            email: "test@hot.ee",
            password: "secret1234"
        })
        const res = await controller.loginUser(loginInfo)
        delete loginInfo.password
        expect(res).toMatchObject(loginInfo)
    })

})



