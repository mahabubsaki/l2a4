import { IJwtPayload } from "./modules/users2/users2.interface";



declare global {
    namespace Express {
        interface Request {
            user: IJwtPayload;
        }
    }
}