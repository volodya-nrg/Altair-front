export interface JwtPayloadInterface {
    Domain: string;
    Exp: number;
    UserId: number;
    UserRole: string;
    JWT: string;
}
