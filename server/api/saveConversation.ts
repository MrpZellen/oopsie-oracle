import mongoose from 'mongoose'
import { z } from 'zod'
import Convo from '~/model/conversationHistory'
import User from '~/model/users'
import connectDB from '~/utils/db'

export default defineEventHandler(async (event) => {
    await connectDB()
    console.log('reached the API!')
    let req = await readBody(event)
    console.log(req)
    //post it
    const addConvo = await Convo.create({
        conversations: req.newConvos
    })
    console.log(addConvo)
    await User.where("username").equals(req.username).updateOne({}, {$push: {conversationHistory: addConvo._id}})
    mongoose.connection.close()
    return {}
})