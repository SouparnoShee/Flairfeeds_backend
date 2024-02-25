import express from "express"
import { Status } from "../models/Status.js"
import { IsAuthenticated } from "../auth/authenticate.js"



const router = express.Router()


router.post("/create", IsAuthenticated, async (req, res) => {
    try {
        const status = new Status(req.body)
        const savedStatus = await status.save();

        res.status(201).json({
            success: true,
            message: savedStatus,
        })
    } catch (error) {
        res.status(500).json(error)
    }

})


router.delete("/:id", IsAuthenticated, async (req, res) => {
    try {
        await Status.findByIdAndDelete(req.params.id)
        res.status(200).json("Status has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }

})


router.get("/user/:userId", IsAuthenticated, async (req, res) => {
    try {
        const getStatus = await Status.find({ userId: req.params.userId })
        res.status(200).json({
            success: true,
            message: getStatus,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/", async (req, res) => {
    try {
        const allStatus = await Status.find();
        res.status(200).json({
            success: true,
            message: allStatus
        })
    } catch (error) {
        res.status(500).json(error)
    }
})





export default router