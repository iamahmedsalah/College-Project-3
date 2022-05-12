// Start Server 
const { error, info } = require('console');
const e = require('express');
const express = require('express');
const app = express ();
const Port = process.env.Port || 8000;
const nodemailer = require("nodemailer");


// Middleware
app.use(express.static('website'))
app.use(express.json())
// Test Our Server 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website/index.html');
})
app.post('/', (req, res) => {
    console.log(req.body)
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'fitlicious.eg@gmail.com',
            pass:'A0123456789'
        }
    })
    const mailOptions = {
        from: req.body.Email,
        to: 'fitlicious.eg@gmail.com',
        subject:` Message Fromm ${req.body.Email}: ${req.body.Subject}`,
        text: req.body.Message
    }
    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email Sent' , info.response );
            res.send('success')
        }
    })
})
app.listen(Port, ()=>{
    console.log(`Server is Runnimg on ${Port}` );
})