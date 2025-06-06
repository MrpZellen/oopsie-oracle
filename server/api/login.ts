import { z } from 'zod'
import mongoose from 'mongoose'
import User from '~/model/users'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  console.log('reached api!')
  let req = await readBody(event)
  const result = bodySchema.safeParse({email: String(req.email), password: String(req.password)})
  if (!result.success) {
    return result.error
  }
  console.log("valid instance")
  //then we send the user to mongoDB
  const mongoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    conversationHistory: {type: Array, required: false }
  })
  //post it
  const userId = await User.where("username").equals(req.username).select("_id")
  if (!userId){
    console.log("null userId")
  }
  //then we run our session.
    await setUserSession(event, {
      user: {
        id: userId,
        username: req.username
      }
    })
    return {}
  })