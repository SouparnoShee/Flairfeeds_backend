import express from "express"
import { Comment } from "../models/Comments.js"
import { IsAuthenticated } from "../auth/authenticate.js"

const router = express.Router()


router.post("/create", IsAuthenticated, async (req, res) => {
    try {
        const createComment = new Comment(req.body)
        const saveComment = await createComment.save();
        res.status(201).json({
            success: true,
            message: saveComment,
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

router.delete("/:id", IsAuthenticated, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(201).json("Comment successfully deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/post/:postId", IsAuthenticated, async (req, res) => {
    try {
        const getComments = await Comment.find({ postId: req.params.postId })
        res.status(201).json({
            success: true,
            message: getComments,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})



export default router