const nodemailer = require('nodemailer');

// Configure transporter with your personal email (e.g., Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // your personal email
    pass: process.env.MAIL_PASS  // app password (not your main password)
  }
});

function examforgeWelcomeTemplate(name) {
  return `
  <div style="background:#101c2c;padding:0;margin:0;font-family:'Inter',Arial,sans-serif;color:#fff">
    <div style="max-width:480px;margin:40px auto 0;background:#18263a;border-radius:18px;box-shadow:0 8px 32px #00000055;overflow:hidden">
      <div style="background:linear-gradient(90deg,#1edb8a 0,#1e90db 100%);padding:24px 32px 18px 32px;display:flex;align-items:center;gap:14px">
        <img src='https://i.imgur.com/0y0y0y0.png' width='38' height='38' style='border-radius:8px;background:#fff;padding:4px;'/>
        <div>
          <div style="font-size:22px;font-weight:700;letter-spacing:-1px;">ExamForge</div>
          <div style="font-size:13px;opacity:.85;">AI-powered exam preparation platform</div>
        </div>
      </div>
      <div style="padding:32px 32px 24px 32px;">
        <h2 style="font-size:22px;font-weight:700;margin:0 0 10px 0;">Welcome to ExamForge, ${name} <span style='font-size:20px;'>🎓</span></h2>
        <div style="font-size:15px;opacity:.92;margin-bottom:18px;">Your account has been successfully created. You're all set to start generating AI-powered mock exams and improving your performance.</div>
        <div style="background:#162032;padding:18px 20px 14px 20px;border-radius:12px;margin-bottom:18px;">
          <div style="font-size:15px;font-weight:600;margin-bottom:7px;">You can now:</div>
          <ul style="margin:0 0 0 18px;padding:0;font-size:15px;line-height:1.7;">
            <li>✔️ Generate AI-powered mock tests</li>
            <li>✔️ Take real-time timed exams</li>
            <li>✔️ Get instant grading and explanations</li>
            <li>✔️ Track your performance with analytics</li>
            <li>✔️ Receive AI study recommendations</li>
          </ul>
        </div>
        <div style="margin-bottom:18px;">
          <div style="font-size:15px;font-weight:600;margin-bottom:7px;">Get started in 3 steps:</div>
          <ol style="margin:0 0 0 18px;padding:0;font-size:15px;line-height:1.7;">
            <li>Create your first mock test</li>
            <li>Attempt the timed exam</li>
            <li>Analyze your performance</li>
          </ol>
        </div>
        <a href="https://examforge.com" style="display:inline-block;background:linear-gradient(90deg,#1edb8a 0,#1e90db 100%);color:#101c2c;font-weight:700;font-size:16px;padding:13px 32px;border-radius:9px;text-decoration:none;margin-bottom:18px;">Open ExamForge</a>
        <div style="font-size:13px;opacity:.7;margin-top:18px;">Stay focused and keep improving. We're here to help you succeed in your exams.<br><br>— The ExamForge Team</div>
      </div>
      <div style="background:#101c2c;padding:18px 32px 14px 32px;font-size:12px;opacity:.6;text-align:center;">ExamForge — AI Mock Test Platform<br>This is an automated email. Please do not re reply.</div>
    </div>
  </div>
  `;
}

async function sendWelcomeEmail(to, name) {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: 'Welcome to ExamForge! 🎓',
    html: examforgeWelcomeTemplate(name)
  });
}

module.exports = { sendWelcomeEmail };
