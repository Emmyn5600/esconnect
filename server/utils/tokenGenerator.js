/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const  tokenGenerator = async (payload) => {
    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2 days' });

    return token;
  }

const decodeToken = async (token) => {
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    return user;
}
export { tokenGenerator, decodeToken } 