import config from "../config";
import jwt, { Secret } from 'jsonwebtoken';

const jwtTokenCreator = (_id: string, role: string, email: string): string => {
    return jwt.sign({ _id, role, email }, config.jwtSecret as Secret, { expiresIn: '10h' });
};
export default jwtTokenCreator;