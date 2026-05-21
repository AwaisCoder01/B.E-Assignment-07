import express from "express"
import cors from "cors"
import multer from "multer"
import { Post } from "./models/postSchema.js"
import cloudinary from "./src/config/cloudinary.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post("/profile", upload.single("avatar"), async (req, res) => {

    try {

        const file = req.file
        const { title, description } = req.body;

        if (!file) {
            return res.status(400).json({
                status: false,
                message: "Post is required"
            })
        }


        const cloudResponse = await cloudinary.uploader.upload(
            file.path,
            {
                folder: "posts"
            }
        )


        let post = await Post.create({
            title: title,
            description: description,
            postImage: cloudResponse.secure_url
        })


        res.status(200).json({
            status: true,
            message: "Image uploaded successfully!",
            data: post
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "server error" + error.message
        })
    }
})
