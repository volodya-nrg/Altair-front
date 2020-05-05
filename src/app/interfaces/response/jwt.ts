import {UserInterface} from './user';

export interface JwtInterface {
    JWT: string;
    user: UserInterface;
}
