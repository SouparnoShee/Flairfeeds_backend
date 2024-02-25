import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Status = mongoose.model("Status", StatusSchema)