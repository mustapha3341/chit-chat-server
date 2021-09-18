import { Schema, model } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    { timestamps: true }
);

userSchema.methods = {
    authenticate(plainTextPassword) {
        return compareSync(plainTextPassword, this.password);
    },

    hashPassword(plainTextPassword) {
        if (!plainTextPassword) {
            throw new Error("Could not save user");
        }

        const salt = genSaltSync(12);
        return hashSync(plainTextPassword, salt);
    },
};

export default model("User", userSchema);
