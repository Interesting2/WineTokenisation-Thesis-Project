const User = require('../models/users');
const crypto = require('../util/crypto');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com.au',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'oldphonedeals.group05@zohomail.com.au',
        pass: 'LypNzg79mqvb'
    }
});

// Send User Verification Code
async function sendCode(req, res) {
  console.log("SENDING VERIFICATION CODE\n\n\n");
  const { email } = req.body;
  console.log(email);

  // Generate a unique verification token
  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  console.log(verificationCode);

  // Send the verification email with the verificationToken
  const mailOptions = {
    from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
    to: email,
    subject: 'Email Verification',
    text: `Please enter the following 4-digit code in the browser to verify your email: ${verificationCode}`,
  };
  await transporter.sendMail(mailOptions);

   // set code in user
   const updatedUser = await User.updateVerificationToken(email,verificationCode);
   console.log(updatedUser);
   if (!updatedUser) {
     return res.status(400).json({ message: 'Send email failed'});
   }

  res.json({ message: 'Verification Code Sent' });
}
  
async function verify(req, res) {
  console.log("VERIFYING USER\n\n\n");
  
  const { email, code } = req.body;
  console.log(email);
  console.log(code);
  
  try {
    // Find the user with the matching verification token
    const user = await User.verifyUserToken(email, code);
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    res.json({ success: "You have been verified." });
  } catch (error) {
      console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function verifyUser(req, res) {
  const token = req.cookies.token;
  // console.log("jwt token: "+token);

  if (token === undefined) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  try {
    const decoded = jwt.verify(token, '12345678');
    // Check if the user is authorized to access this route if needed
    const userId = decoded.id;
    const user = await User.findUserByUserId(userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid UserId',user_id: -1 });
    }
    // Return data for the dashboard here
    res.json({ message: 'Welcome to the dashboard', user_id: userId });
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
}

async function checkIsEmailVerified(req, res) {
  console.log("CHECKING IF EMAIL IS VERIFIED\n\n\n");
  const token = req.cookies.token;
  console.log("jwt token: "+token);

  if (token === undefined) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  try {
    const decoded = jwt.verify(token, '12345678');
    // Check if the user is authorized to access this route if needed
    const userId = decoded.id;
    const user = await User.findUserByUserId(userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid user',user_id:0 });
    }

    console.log(user.isVerified);

    if (user.isVerified == 1){
      return res.status(200).json({ message: 'Email is verified',user_id:user.id });
    }else{
      return res.status(400).json({ message: 'Email is not verified',email:user.email });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
}

// User register
async function register(req, res) {
  console.log("REGISTERING USER\n\n\n")
  const { email, password, self_intro } = req.body;

  console.log(email);
  console.log(password);
  // check email 
  const existingUser = await User.findUserByEmail(email);
  if (existingUser) {
    console.log("REGISTERED ALREADY")
    return res.status(400).json({ message: 'Registered Email', user_id:0});
  }

  // password hash
  const passwordSalt = crypto.generateSalt();

  const passwordHash = crypto.generateHash(password,passwordSalt);
  //console.log(passwordHash);

  // get current time
  const createTime = new Date();
  
  // add new user
  const result = await User.addUser(email, passwordSalt,passwordHash,self_intro,createTime);

  //get user
  const addedUser = await User.findUserByEmail(email)

  const user_id = {id: addedUser.id}
  

  if (!addedUser)  {
    return res.status(400).json({ message: 'System Error', user_id:0});
  }

  const token = jwt.sign(user_id, '12345678');
  console.log("JWT token: "+token);

  res.cookie('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict', // or 'lax'
  });
  
  
  // return registration message
  return res.status(200).json({ message: 'Successful Registration',user_id:addedUser.id});
}

// user login
async function login(req, res) {
    console.log("LOGGING IN USER\n\n\n");
    const { email, password, rememberMe} = req.body;
  
    // find user
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email',user_id:0 });
    }
  
    // get input password hash
    const passwordHash = crypto.generateHash(password,user.password_salt);

    // compare password hash
    if (!(user.password_hash == passwordHash)) {
      return res.status(400).json({ message: 'Invaild Password',user_id:0 });
    }
    
    const user_id = {id: user.id}
    const expirationTime = rememberMe ? '30d' : '1h'; // 30 days or 1 hour
    const token = jwt.sign(user_id, '12345678', { expiresIn: expirationTime });
    console.log("JWT token: "+token);

    // res.cookie('token', token, { httpOnly: true });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // ms
    });

    // successful login
    return res.status(200).json({ message: 'Successful Login', user_id: user_id });
  }

async function logout(req, res) {
    console.log("LOGGING OUT USER\n\n\n");
    res.clearCookie('token');
    res.status(200).json({ message: 'Successful Logout' });
}
  
// get user token info
async function getAccountTokenInfo(req, res){
  console.log("GETTING USER TOKEN INFO\n\n\n");
  console.log(req.cookies)
  const token =  req.cookies.token;
  console.log("jwt token: "+token); 

  const decoded = jwt.verify(token, '12345678');
  const userId = decoded.id;
  console.log("jwt decoded user id: "+ userId);

  const user = await User.findUserByUserId(userId);
  if (!user) {
    return res.status(400).json({ message: 'Invalid UserId',user_id: userId });
  }
  return res.status(200).json({ normal_token_num: user.normal_token_num, management_token_num: user.management_token_num });

}
  
module.exports = { register,login,getAccountTokenInfo, sendCode, verify, verifyUser, logout, checkIsEmailVerified};