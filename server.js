// Start Server and requirement
const { error, info } = require('console');
const e = require('express');
const express = require('express');
const app = express ();
const Port = process.env.Port || 8000;
const  dotenv = require('dotenv');
require('dotenv').config({path:'.env' });
const path =  require('path');
const nodemailer = require("nodemailer");
const mysql = require('mysql');
const req = require('express/lib/request');
const res = require('express/lib/response');



// Middleware
app.use(express.static(path.join(__dirname, 'website')))
app.use(express.json())
// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));
app.use(express.json());

// Test Our Server 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website/index.html');
})


app.post('/', (req, res) => {
    console.log(req.body)
    // Contact Us
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ContactEmail,
            pass: process.env.ContactPassword
        }
    })
    const mailOptions = {
        from: req.body.Email,
        to: process.env.ContactEmail,
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
// End Contat us
const mainDirectory = path.join(__dirname, 'website');
app.use(express.static(mainDirectory));
app.set('view engine', 'hbs');

// Data Base Conncetion 
const db = mysql.createConnection({
    host: process.env.DataBaseHost,
    user: process.env.DataBaseUser,
    password: process.env.DataBasePassword,
    database: process.env.DataBase
});
db.connect((error)=>{
    if(error) {
        console.log(error);
    } else {
        console.log(' MYSQL Connected...')
    }
})
//End Data Base Conncetion
// routers
app.use('/' , require('./routes/pages'));
app.use('/auth', require('./routes/auth'));






app.listen(Port, ()=>{
    console.log(`Server is Runnimg on ${Port}` );
})