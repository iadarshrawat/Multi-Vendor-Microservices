import mongoose from 'mongoose'
mongoose.set("strictQuery", false)

const ConnectDB = async ()=>{
    const DB_URL = "mongodb+srv://nodejsboy:nodejsboy@cluster0.afzustt.mongodb.net/nodejs-sls-mc";
    try {
        await mongoose.connect(DB_URL);
    } catch (error) {
        console.log(error);
    }
}

export {ConnectDB};