const express = require("express");
const app = express();
require("dotenv").config();
const nodemailer = require("nodemailer");
const { Worker } = require("bullmq");

// Nodemailer transporter
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "malishubham025@gmail.com", // Email address
    pass: process.env.email_pass,     // Email app password (ensure it's secure)
  },
});

// Function to send email
function sendMail(otp, email) {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: "malishubham025@gmail.com", // Sender address
        to: email,                        // Receiver email
        subject: "Gmail Verification",    // Email subject
        text: `Hello user, your OTP is ${otp}, valid for 5 minutes.`, // Email body
      },
      (err, info) => {
        if (err) {
          console.error("Error sending mail:", err);
          return reject(err);
        }
        console.log("Email sent successfully:", info.response);
        resolve(info.response);
      }
    );
  });
}

// Redis connection options
const redisOptions = {
  host: "127.0.0.1", // Redis host
  port: 6379,        // Redis port
};

// BullMQ Worker
try {
  const worker = new Worker(
    "email-queue",
    async (job) => {
      const { otp, email } = job.data; // Extract otp and email from job data
      console.log("Processing job:", job.id, job.data);

      // Call sendMail function with otp and email
      await sendMail(otp, email);
    },
    { connection: redisOptions }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully.`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
  });
} catch (err) {
  console.error("Worker error:", err);
}

// Start server
app.listen(5001, () => {
  console.log("Worker server is listening on port 5001");
});
