
interface AuthUser {
    id: string;
    role?: string;
    status?: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthUser
        }
    }
}
export { };