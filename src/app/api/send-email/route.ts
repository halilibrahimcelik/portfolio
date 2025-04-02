import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { message, email, name } = await req.json();
    const mailOptions: Options = {
      from: `"${name} via  ${email}" <${email}>`, // Format: "Display Name <email>"
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})
      ${message}`,
      html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
