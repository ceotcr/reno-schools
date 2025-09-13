import { prisma } from '@/lib/prisma'
import { sendOtpEmail } from '@/lib/services/email.service'
import { NextResponse } from 'next/server'

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.otp.deleteMany({ where: { email } })
    await prisma.otp.create({ data: { email, code: otp, expiresAt } })

    await sendOtpEmail(email, otp)
    return NextResponse.json({ success: true })
}