import { z } from 'zod'
import User from '~/model/users'
import connectDB from '~/utils/db'

export default defineEventHandler(async (event) => {
    await connectDB()
    console.log('reached the API!')
    let req = await readBody(event)
    await User.where("username").equals(req.username).updateOne({}, {$push: {conversationHistory: req.conversationHistory}})
    return {}
})