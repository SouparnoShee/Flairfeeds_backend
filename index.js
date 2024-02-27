import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auths.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import statusRouter from "./routes/status.js"
import cors from "cors"
import multer from "multer";
import path from "path";
import cloudinary from "./features/cloudinary.js";

const __dirname = path.resolve();
const app = express()

// Cors Policy middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}))





// !middlewares
dotenv.config();
app.use(express.json())
app.use("/profileimages", express.static(path.join(__dirname, "/profileimages")))
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/status", statusRouter)



// ?Database
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { dbName: "Flairdata" })
        console.log("Databse is connected successfully")
    } catch (error) {
        console.log(error)
    }
}



// !File uploading 
const pstorage = multer.diskStorage({
    destination: (req, res, fn) => {
        fn(null, "profileimages")
    },
    filename: (req, res, fn) => {

        fn(null, req.body.img)
    }
})

const pupload = multer({ storage: pstorage })

app.post("/api/v1/upload/profile", pupload.single("file"), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err
            })
        } else {
            res.status(200).json({
                success: true,
                message: result
            })
        }
    })

})


const storage = multer.diskStorage({
    destination: (req, res, fn) => {
        fn(null, "images")
    },
    filename: (req, res, fn) => {

        fn(null, req.body.img)
    }
})


const upload = multer({ storage: storage })

app.post("/api/v1/upload/images", upload.single("file"), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err
            })
        } else {
            res.status(200).json({
                success: true,
                message: result
            })
        }
    })
})





// *App Listen
app.listen(process.env.PORT, () => {
    console.log(`The App is running on Port ${process.env.PORT}`)
    connectDb();
})