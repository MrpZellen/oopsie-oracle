import { z } from 'zod'
import mongoose from 'mongoose'
import User from '~/model/users'
import connectDB from '~/utils/db'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  await connectDB()
  console.log('reached api!')
  let req = await readBody(event)
  const result = bodySchema.safeParse({email: String(req.email), password: String(req.password)})
  if (!result.success) {
    return result.error
  }
  const { email, password } = result.data
  console.log(req.email, req.password)
  console.log("valid instance")
  //post it
  await User.findOne( { email: email } ).then(async (user) => {
    console.log(user)
      if (!user){
        console.log("null userId")
      }
      if (user?.password != password){
        return {
          error: 'NOT VALID'
        }
      }
      //then we run our session.
        await setUserSession(event, {
          user: {
            username: user.username
          }
    })
  })
  
    mongoose.connection.close()
    return {}
  })