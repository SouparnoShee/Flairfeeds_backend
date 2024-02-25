import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
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
    },
    likePost: {
        type: Array,
    }
}, { timestamps: true })

export const Post = mongoose.model("Post", PostSchema)