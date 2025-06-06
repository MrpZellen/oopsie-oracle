import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const convoSchema = new Schema({
    conversations: { type: Array, required: true}
})

const Convo =  mongoose.model('Convo', convoSchema, 'conversationHistory') 
export default Convo;