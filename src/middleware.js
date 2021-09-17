import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const setupGlobalMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());
};

export default setupGlobalMiddleware;
