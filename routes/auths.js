import express from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../features/cookie.js";
import { IsAuthenticated } from "../auth/authenticate.js";



const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { profilePhoto, username, email, password } = req.body
        let createUser = await User.findOne({ email })
        if (createUser) {
            res.status(404).json({
                success: false,
                message: "User Already Exists"
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hashSync(password, salt)
            createUser = await User.create({ profilePhoto, username, email, password: encryptedPassword })
            sendCookie(createUser, res, `Welcome to Flairfeeds ${createUser.username}`, 201)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        else {
            const decrypt = await bcrypt.compareSync(password, user.password)
            if (!decrypt) {
                res.status(401).json({
                    success: false,
                    message: "Wrong Credentials"
                })
            }
            else {
                sendCookie(user, res, `Logged In Successfully, Welcome Back ${user.username}`, 201)
            }
        }
    } catch (error) {
        console.log(error)
    }
})



router.get("/refetch", IsAuthenticated, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
})


router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
})



export default router