import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    }
}, { timestamps: true })





export const Comment = mongoose.model("Comment", commentSchema)