import express, {Application} from 'express';
import {createConnection} from "typeorm"
import dbConf from "./config/database"

const PORT = process.env.PORT || 3000

const app: Application = express();

app.get('/', (req, res) => {
    res.send('Wesssll done!');
})





createConnection(dbConf).then((_connection) => {
    app.listen(PORT, () => {
        console.log('The application is listening on port 3000!');
    })
}).catch((err) => {
    console.log("db connection failed", err)
    process.exit(1)
})