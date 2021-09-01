import express, {Application} from 'express';
import {createConnection} from "typeorm"
import dbConf from "./config/database"
import swaggerUi from "swagger-ui-express";
import Router from "./routes"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {default as swaggerJson} from './swagger.json'

const PORT = process.env.PORT || 3000

const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
)

app.use("/api", Router)


createConnection(dbConf).then((_connection) => {
    app.listen(PORT, () => {
        console.log('The application is listening on port 3000!');
    })
}).catch((err) => {
    console.log("db connection failed", err)
    process.exit(1)
})