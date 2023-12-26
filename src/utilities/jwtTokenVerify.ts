import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { IJwtPayload } from "../modules/users2/users2.interface";

const jwtTokenVerify = (token: string) => {
    return jwt.verify(token, config.jwtSecret as Secret) as IJwtPayload;
};
export default jwtTokenVerify;
