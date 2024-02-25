import express from "express"
import { Post } from "../models/Posts.js"
import { IsAuthenticated } from "../auth/authenticate.js"
import { Comment } from "../models/Comments.js";


const router = express.Router();



router.post('/create', IsAuthenticated, async (req, res) => {
    try {
        const createPost = new Post(req.body)
        const savedPost = await createPost.save();
        res.status(201).json({
            success: true,
            message: savedPost,
        })
    } catch (error) {
        res.status(500).json(error)
    }


})


router.put('/:id', IsAuthenticated, async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(201).json({
            success: true,
            message: updatePost
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.delete('/:id', IsAuthenticated, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({ postId: req.params.id })
        res.status(200).json({
            success: true,
            message: "Post Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/:id', IsAuthenticated, async (req, res) => {
    try {
        const getPosts = await Post.findById(req.params.id)
        res.status(201).json({
            success: true,
            message: getPosts
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
    const query = req.query;
    try {
        const searchFilter = {
            title: { $regex: query.search, $options: "i" }
        }
        const posts = await Post.find(query.search ? searchFilter : null);
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})



router.get("/users/:userId", IsAuthenticated, async (req, res) => {
    try {
        const post = await Post.find({ userId: req.params.userId })
        res.status(200).json({
            success: true,
            message: post
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


// TODO: Logic to like a post and unlike a post

router.put("/like/:id", IsAuthenticated, async (req, res) => {
    try {
        const liked = await Post.findByIdAndUpdate(req.params.id, { $push: { likePost: req.body.user } }, { new: true })
        res.status(200).json(liked)
        console.log(liked.likePost.length)

    } catch (error) {
        console.log(error)

    }
})
router.put("/unlike/:id", IsAuthenticated, async (req, res) => {
    try {
        const unliked = await Post.findByIdAndUpdate(req.params.id, { $pull: { likePost: req.body.user } }, { new: true })
        res.status(200).json(unliked)
        console.log(unliked.likePost.length)

    } catch (error) {
        console.log(error)

    }
})

export default router