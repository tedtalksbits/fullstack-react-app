import express from 'express';
import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const router = express.Router();

/************************** REGISTER **************************/

router.post('/register', async (req, res) => {
    //check if email is already in use
    const userFoundWithEmail = await User.findOne({ email: req.body.email });
    if (userFoundWithEmail) {
        return res.status(400).json({
            error: true,
            message: 'Email already in use',
            status: 400,
        });
    }

    //check if username is already in use
    const userFoundWithUsername = await User.findOne({
        username: req.body.username,
    });
    if (userFoundWithUsername) {
        return res.status(400).json({
            error: true,
            message: 'Username already in use',
            status: 400,
        });
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PW_SECRET
        ).toString(),
        // ^^ encrypt user password => CryptoJS.AES.encrypt("messgae", "secret") ^^
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ msg: 'error saving user', errorMsg: error });
    }
});

/************************** LOGIN **************************/

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });

        //check if user wasn't found
        if (!user) {
            res.status(401).json({
                errorMsg:
                    'Error! No user was found with that username/password',
                error: true,
                status: 401,
            });
            return;
        }

        const decryptedPw = CryptoJS.AES.decrypt(
            user.password,
            process.env.PW_SECRET
        );
        // ^^ CryptoJS.DES.decrypt(encrypted, "Secret Passphrase"); ^^

        const OriginalPassword = decryptedPw.toString(CryptoJS.enc.Utf8);

        //json web token to verify user
        //create access token that only stores id and isAdmin from user object
        //token expires in 3 days
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        //check if decrypted password matches password in body object
        if (OriginalPassword !== req.body.password) {
            res.status(401).json({
                errorMsg:
                    'Error! No user was found with that username/password',
                error: true,
                status: 401,
            });
            return;
        }

        // return user without password
        // destructor to remove password property from object
        const { password, ...userWithoutPw } = user._doc;
        const userWithToken = { ...userWithoutPw, accessToken };
        res.status(200).json(userWithToken);
    } catch (error) {
        console.log(error);
    }
});

export default router;
