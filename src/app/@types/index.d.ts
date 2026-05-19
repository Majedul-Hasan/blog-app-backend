
interface AuthUser {
    _id?: string;
    role?: string;
    status?: string;
    email?: string;
    accountType?: string;
    postCount: number;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthUser
        }
    }
}
export { };