import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    conversationHistory: [String]
})

const User = model('User', userSchema)
export default User;