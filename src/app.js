import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import logger from './helpers/logger.js'
import router from "./router/index.js"
import sequelize from "./models/index.js"

// set environment file
config({ path: `.env.${process.env.NODE_ENV}` });

// init express app
const app = express();
const PORT = process.env.PORT || 8000;
const HOSTNAME = "127.0.0.1";

app.use(json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
router(app);

// start server
// 
const server = app.listen(PORT, HOSTNAME, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("app is running on port", host, port);
})

// test api
app.get('/', function (req, res) {
    res.status(200).json("This is Test Connection Project !")
});

//authenticate database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    logger.error(error)
    console.error('Unable to connect to the database:', error);
}