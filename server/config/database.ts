import {ConnectionOptions} from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.HOST || "db",
    username:  process.env.USER || "postgres",
    password:  process.env.PASSWORD || "example",
    database:  process.env.DB_NAME || "ETMS",
    entities: [],
    synchronize: true
}

export default config