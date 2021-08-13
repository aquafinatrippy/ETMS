import {ConnectionOptions} from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    username:  process.env.POSTGRES_USER || "postgres",
    password:  process.env.POSTGRES_PASSWORD || "example",
    database:  process.env.POSTGRES_DB || "ETMS",
    port: 5432,
    entities: [],
    synchronize: true
}

export default config

