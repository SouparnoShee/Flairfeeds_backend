import express from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import { IsAuthenticated } from "../auth/authenticate.js";
import { Post } from "../models/Posts.js";
import { Comment } from "../models/Comments.js";



const router = express.Router();


router.put("/:id", IsAuthenticated, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: updateUser,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.delete("/:id", IsAuthenticated, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({ userId: req.params.id })
        await Comment.deleteMany({ userId: req.params.id })
        res.status(200).json("Post Deleted successfully")

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", IsAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json({
            success: true,
            message: info,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router