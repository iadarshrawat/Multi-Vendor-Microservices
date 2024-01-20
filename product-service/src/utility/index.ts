import { error } from "console";
import { ConnectDB } from "./db-connection";

ConnectDB()
    .then(()=>{
        console.log("DB connected");
    })
    .catch((error)=>{
        console.log(error)
})