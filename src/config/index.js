import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const env = process.env.NODE_ENV;
let envConfig = {};

const baseConfig = {
    port: process.env.PORT || 4000,
    secrets: {},
};

switch (env) {
    case "dev":
    case "development":
        envConfig = require("./dev").config;
        break;
    case "prod":
    case "production":
        envConfig = require("./prod").config;
        break;
    case "test":
    case "testing":
        envConfig = require("./testing").config;
        break;
    default:
        envConfig = require("./dev").config;
}

export default Object.assign(baseConfig, envConfig);
