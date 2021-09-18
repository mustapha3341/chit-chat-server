import { Router } from "express";
import groupController from "./group.controller";

export const groupRouter = Router();

groupRouter.param("id", groupController.findByParam);

groupRouter
    .route("/")
    .get(groupController.getAll)
    .post(groupController.createOne);

groupRouter
    .route("/:id")
    .get(groupController.getOne)
    .put(groupController.updateOne)
    .delete(groupController.deleteOne);
