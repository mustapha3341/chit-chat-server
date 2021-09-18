import { Router } from "express";

import { userRouter } from "./user";
import { groupRouter } from "./group";
import { apiErrorHandler } from "../modules/error-handler";

export const restRouter = Router();

restRouter.use("/user", userRouter);
restRouter.use("/group", groupRouter);
restRouter.use(apiErrorHandler);
