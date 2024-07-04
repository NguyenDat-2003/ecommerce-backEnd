import nodemailer from 'nodemailer'
import { env } from '~/config/environment'

export const sendEmail = async (data, req, res) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD
    }
  })

  // 2) Define the email options
  const mailOptions = {
    from: 'Dat Nguyenn <test2003@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.message,
    html: data.htm
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}
