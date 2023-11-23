import { Users, Companies } from '../../models/User.js';
import { generateToken } from '../../utils/tokenGenerator.js';
import { otpRef } from '../../models/User.js';
import nodemailer from 'nodemailer';
import { decodeTokenAndGetId } from '../../utils/decodeTokenAndGetId.js';

export const addMember = async (req, res) => {
  const { fullName, email, phoneNo, collegeId, department, role, token } = req.body;

  const id = decodeTokenAndGetId(token);

  try {
    const adminSnapshot = await Users.doc(id).get();
    const adminData = adminSnapshot.data();

    if (!adminData) {
      return res.status(404).send({ message: 'Admin not found.' });
    }

    if (adminData.role !== 'admin' && adminData.role !== 'president') {
      return res.status(403).send({ message: 'You are not eligible for this.' });
    }

    if (role !== 'member' && adminData.role !== 'president') {
      return res.status(403).send({ message: 'You are not eligible for this.' });
    }

    const userSnapshot = await Users.where('email', '==', email).get();

    if (!userSnapshot.empty) {
      return res.status(409).send({ message: 'User already registered.' });
    }

    const info = {
      fullName,
      email,
      phoneNo,
      collegeId,
      department,
      role,
      password: '',
      division: ['cbd']
    };

    await Users.add(info);

    const emailSent = await sendOtp(email);

    if (emailSent) {
      return res.status(200).send({ message: 'User added successfully. Email sent.' });
    } else {
      return res.status(500).send({ message: 'User added successfully. Error sending email.' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};

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
      subject: 'Welcome to CSEC Club!',
      html: `
        <p>Congratulations! You have been successfully added to the CSEC Club.</p>
        <p>Click the link below to log in and start exploring our community:</p>
        <a href="http://localhost:8080/verifyOtp?k=${otp}&email=${email}" style="display: inline-block; background-color: #0074b7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to CSEC Club</a>
        <p>We look forward to your active participation!</p>
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


export const signUpPresident = async (req, res) => {
  const info = {
    fullName :'fasil hawultie',
    email :'fasilhawultie12@gmail.com',
    phoneNo:'+251940798785',
    collegeId:'ugr/2557814',
    department:'SE',
    role:'admin',
  };
  try{
    await Users.add(info)
    res.status(200).send({message:` added successfully`})
  }catch(e){
    console.log(e)
    res.status(500).send({message:`Internal Server Error.`})

  }

}

// Function to verify OTP link
export const verifyOtpLink = async (req, res) => {


  var otp = req.query.k;
  otp = parseInt(otp, 10);
  const email = req.query.email;

  const userSnapshot = await Users.where('email', '==', email).get();
  
  const userDoc = userSnapshot.docs[0];
    
  const userId = userDoc.id;
  const token = generateToken(userId);
  console.log("Generated Token:", token);

  try {


    const otpDoc = await otpRef.doc(email).get();

    if (!otpDoc.exists) {
      res.status(404).send('OTP not found');
    } else {
      const storedOTP = otpDoc.data().otp;

      const userSnapshot = Users.where("email", "==", email);

      userSnapshot.get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("No users found with the provided email.");
          } else {
            if (otp === storedOTP) {
              const userV = querySnapshot.docs[0];
              userV.ref.update({ verified: true });
              res.send({'message':'OTP verified successfully',"token":token});
            } else {
              res.status(401).send('Invalid OTP');
            }
          }
        })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


