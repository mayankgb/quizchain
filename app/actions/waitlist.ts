"use server"

import { PrismaClient } from "../generated/prisma"


const prisma = new PrismaClient()

export async function addUserToWaitlist(email: string) {
    try {

        const existingEmail = await prisma.waitlist.findFirst({
            where :{
                email: email
            }
        })

        if (existingEmail) {
            return {
                status: 400,
                message: "you already in the waiting list"
            }
        }

        const newUser = await prisma.waitlist.create({
            data: {
                email: email
            }
        })

        return {
            status: 200,
            message: "added in the waitlist"
        }

    }catch(e) {
        console.log(e)
        return {
            status: 500,
            message: "something is up with the server"
        }
    }
}