import nodemailer from 'nodemailer';

function isValidEmail(email) {
  // simple regex check for email validity
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function parseResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST(request) {
  const { name, email, referral, message } = await request.json();
  
  if (!isValidEmail(email)) {
    return parseResponse({ success: false, error: 'Invalid email format' }, 400);
  }

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    let source = `source: ${referral ? referral : 'unknown'}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      replyTo: email,               // incoming sender's email from the form
      to: process.env.SMTP_USER,    // receiver email address
      subject: `${name} visited your website`,
      text: `${source}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return parseResponse({ success: true });
  } catch (error) {
    console.error(error);
    return parseResponse({ success: false, error: error.message }, 500);
  }
}
