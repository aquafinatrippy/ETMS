import express, {Application} from 'express';
import {createConnection} from "typeorm"
import dbConf from "./config/database"
import swaggerUi from "swagger-ui-express";
import Router from "./routes"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3000

const app: Application = express();

app.use(express.json())
app.use(cookieParser())

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "swagger.json"
        }
    })
)

app.use(Router)


createConnection(dbConf).then((_connection) => {
    app.listen(PORT, () => {
        console.log('The application is listening on port 3000!');
    })
}).catch((err) => {
    console.log("db connection failed", err)
    process.exit(1)
})