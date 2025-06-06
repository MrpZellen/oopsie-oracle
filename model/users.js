import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email:    { type: String, required: true },
    conversationHistory: { type: [String], default: [] }
})

const User =  mongoose.model('User', userSchema, 'users') 
export default User;