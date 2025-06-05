import { z } from 'zod'
import mongoose from 'mongoose'
import User from '~/model/user'

const bodySchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
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
    const mongoSchema = new mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        conversationHistory: {type: Array, required: false}
    })

    mongoose.model('Post', mongoSchema)
    console.log('posted')

})