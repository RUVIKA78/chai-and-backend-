// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import  connection from "./db/db.js";

dotenv.config({
    path:'./env'

})
connection()


/*
import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
const app = express();

(async () => {
    try {
         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR:", error)
            throw error
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`server is listening at ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.error("ERROR:", error)
        throw error
    }
});
*/
