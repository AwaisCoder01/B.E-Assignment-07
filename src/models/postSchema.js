import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    postImage: String,
})
export const Post = mongoose.model("Post", postSchema)