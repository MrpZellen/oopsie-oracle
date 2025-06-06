import { z } from 'zod'
import mongoose from 'mongoose'
import User from '~/model/users'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  //then we run our session.
    await clearUserSession(event)
    return {}
  })