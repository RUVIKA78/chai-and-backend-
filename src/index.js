import dotenv from "dotenv"
// import connection  from "./db/db.js";
//import { app } from "./app.js";

/*dotenv.config({
    path: './env'

})
connection()

    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port : ${process.env.PORT}`);
        })

    })
    .catch((err) => {
        console.log("connection failed", err)
    })*/



// import express from "express";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// const app = express();


dotenv.config();


/*(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI/process.env.DB_NAME)
        // app.on("error", (error) => {
        //     console.log("ERROR:", error)
        //     throw error/
        
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


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)

//         console.log("database connect")

//     } catch (err) {
//         console.error(err)
//         console.log("database not connect")

//     }
// }

// app.listen(process.env.PORT, aysnc () => {
//      await connectDB()
//     console.log("your server is liste")
// })
import express from "express"
import mongoose from "mongoose";

const app = express()
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/db");
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit the process if database connection fails
    }
};

// Import 'app' or ensure that it's defined before this code runs

const startServer = async () => {
    await connectDB(); // Establish database connection before starting the server
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port", `${process.env.PORT}`);
    });
};

startServer();
