import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
 

let server : Server;
 


const startServer = async() =>{
   try{
         await mongoose.connect(envVars.DB_URL)

    console.log("Conected to DB");
    server = app.listen(envVars.PORT, () => {
        console.log(`Server is listening to port 5000 ${envVars.PORT}`)
    })
   }
   catch(error){
    console.log(error)
   }
}

(async () =>{
   await startServer()
await seedSuperAdmin()
})()

process.on("unhandledRejection", (err)=> {
    console.log("Unhandled Rejection detected... Server Shutting down..", err);
    if(server){
        server.close(()=>{
            process.exit(1) // node js server off 
        });
    }
    process.exit(1) // node js server off 
})

process.on("uncaughtException", (err)=> {
    console.log("Uncaught Exception detected... Server Shutting down..", err);
    if(server){
        server.close(()=>{
            process.exit(1) // node js server off 
        });
    }
    process.exit(1) // node js server off 
})


process.on("SIGTERM", (err)=> {
    console.log("SIGTERM signal recieved.   Server Shutting down..", err);
    if(server){
        server.close(()=>{
            process.exit(1) // node js server off 
        });
    }
    process.exit(1) // node js server off 
})


process.on("SIGINT", (err)=> {
    console.log("SIGINT signal recieved.   Server Shutting down..", err);
    if(server){
        server.close(()=>{
            process.exit(1) // node js server off 
        });
    }
    process.exit(1) // node js server off 
})



// unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// uncaught excepton 
// throw new Error("I forgot to handle this local error")


