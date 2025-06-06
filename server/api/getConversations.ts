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
    let results
    User.findOne({username: req.user}).then((result) => {
        results = result?.conversationHistory
    })
    let listOfConvo: any = []
    results!.forEach((element: any) => {
        Convo.findById(element).then((result) =>{
            listOfConvo.push(result)
        })
    });
    return {listOfConvo}
})