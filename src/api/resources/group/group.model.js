import { Schema, model } from "mongoose";

const ObjectID = Schema.Types.ObjectId;

const groupSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
        },
        createdBy: {
            type: ObjectID,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default model("Group", groupSchema);
