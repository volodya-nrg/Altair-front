import {UserExtInterface} from './user';

export interface JwtInterface {
    JWT: string;
    userExt: UserExtInterface;
}
