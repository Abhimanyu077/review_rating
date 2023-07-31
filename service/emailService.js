const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIl_PASS,   
    },
});

const mailOption = {
    from: "abhimanyusinghrathore27@gmail.com",
    to: "abhimanyusinghrathore27@gmail.com",
    subject: "THis is a mail ",
    text: "This is message",
};

module.exports = {
    transporter,
    mailOption,
};