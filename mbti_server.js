const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.listen(3000, () => {
  console.log('서버실행중');
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: false,}));
app.use(express.json());

app.get('/', (_, response) => {
  fs.readFile('mbti.html', 'utf-8', (error,data) => {
    if(error) throw error;
    response.send(data);
  });
});

app.get('/mbti.html', (_, response) => {
  fs.readFile('mbti.html', 'utf-8', (error,data) => {
    if(error) throw error;
    response.send(data);
  });
});

app.get('/type.html', (_, response) => {
  fs.readFile('type.html', 'utf-8', (error,data) => {
    if(error) throw error;
    response.send(data);
  });
});

app.get('/result', (request, response) => {
  fs.readFile('result.html', 'utf-8', (error,data) => {
    const mbtiResult = request.query.mbtiResult;
    console.log(mbtiResult);
    if(error) throw error;
    const resultPage = data.replace('<%= mbtiResult %>', mbtiResult);
    response.send(resultPage);
  });
});

app.post('/result', (req, res) => {
  
  const { name, email, activeCnt} = req.body;
  console.log(req.body);
  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'guronodetest@gmail.com',
      pass: 'psxpamyzfxqsytzk', 
    },
  });

  // Email options
  const mailOptions = {
    from: 'guronodetest@gmail.com', // Sender address
    to: `${email}`,
    subject: `${name}님의 MBTI결과 입니다.`,
    html: `${activeCnt}`,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.redirect(`/result?mbtiResult=${mbtiResult}`);
    }

  // Close the transporter
    transporter.close();
  });
});