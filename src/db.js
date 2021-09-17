import mongoose from "mongoose";
import appConfig from "./config";

mongoose.Promise = global.Promise;

export const connectDatabase = (config = appConfig) => {
    return mongoose.connect(config.db.url, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
