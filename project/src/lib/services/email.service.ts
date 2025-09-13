import nodemailer from 'nodemailer'

export async function sendOtpEmail(to: string, otp: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER as string,
            pass: process.env.SMTP_PASS as string,
        },
    })

    await transporter.sendMail({
        from: `Reno Schools <${process.env.SMTP_USER as string}>`,
        to,
        subject: 'Your OTP Code | Reno Schools',
        html: generateHTMLContent(otp),
        text: generateTextContent(otp),
    })
}

const generateHTMLContent = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your OTP Code</h1>
        <p>Please use the following OTP to complete your sign-in:</p>
        <p class="otp">${otp}</p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>
`

const generateTextContent = (otp: string) => `
Your OTP Code: ${otp}
Please use the above OTP to complete your sign-in.
This OTP is valid for 10 minutes.
If you did not request this, please ignore this email.
`