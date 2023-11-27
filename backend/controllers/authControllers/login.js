import { Users,otpRef } from '../../models/User.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import {generateToken} from '../../utils/tokenGenerator.js' 
// import genere

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the given email exists
    const userSnapshot = await Users.where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(404).send({ message: 'User not found' });
    }

    const userData = userSnapshot.docs[0].data();

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const userDoc = userSnapshot.docs[0]
    const userId = userDoc.id;
    const token = generateToken(userId);
    // At this point, the login is successful
    res.status(200).send({ message: 'Login successful', token: token});

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Internal server error' });
  }
};


export const loginByEmail = async(req,res)=>{
    const {email} = req.body;
    try{
      const userSnapshot = await Users.where('email', '==', email).get();

      if (userSnapshot.empty) {
        return res.status(404).send({ message: 'User not found' });
      }
      const emailSent = await sendOtp(email);
  
      if (emailSent) {
        return res.status(200).send({ message: 'Email sent.' });
      } else {
        return res.status(500).send({ message: 'Error sending email.' });
      }
    }catch(e){
         console.log(e)
        res.status(500).send({message:"Internal server Error"})
    }
}


// Function to send an OTP email
const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        user: 'fasilhawultie19@gmail.com',
        pass: 'lmfu kqzm fpob zqjt',
      },
    });
    const mailOptions = {
      from: 'fasilhawultie19@gmail.com',
      to: email,
      subject: 'Welcome back to CSEC Club!',
      html: `
        <p>Welcome back! You have successfully logged in to the CSEC Club.</p>
        <p>Click the link below to access your account and start exploring our community:</p>
        <a href="http://localhost:3000/verify?&k=${otp}&email=${email}" style="display: inline-block; background-color: #0074b7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to CSEC Club</a>
     
        <p>We appreciate your continued participation!</p>
      `,
    };
    

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully', info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Function to send an OTP and handle the response
const sendOtp = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", otp);
    await otpRef.doc(email).set({ otp });

    const emailSent = await sendOtpEmail(email, otp);

    return emailSent;
  } catch (error) {
    console.error(error);
    return false;
  }
}
