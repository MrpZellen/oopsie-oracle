import mongoose from 'mongoose'
import { z } from 'zod'
import User from '~/model/users'
import connectDB from '~/utils/db'
const bodySchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
    await connectDB()
    console.log('reached the API!')
    let req = await readBody(event)
    const result = bodySchema.safeParse(req)
    if(!result.success) {
        return result.error
    }
    console.log('valid instance')
    const { username, email, password } = result.data
    //check if the username exists in the database
    //check if the email exists in the database
    //else, create a new user
    const makeUser = await User.create({
        username: username,
        password: password,
        email: email,
        conversationHistory: []
    }).catch(err => console.error('Mongoose Error:', err))
    console.log(makeUser)
    mongoose.connection.close
})