import dotenv from "dotenv";
import path from 'path';
dotenv.config({path: path.resolve(__dirname, ".env")})

import {adjectives, nouns} from './words';
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";


export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

console.log(process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD)



const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options))
    
    return client.sendMail(email)
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "vkdnj4158@naver.com",
        to: address,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login secret it <br/>
        secret: <Strong>${secret}</Strong>.
        <br/>Copy paste on the app/website to log in`
    }
    return sendMail(email)
}


//npm jsonwebtoke
//생성하면서 암호화
export const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET);