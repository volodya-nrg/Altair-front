import {PhoneInterface} from './phone';

export interface UserInterface {
    userId: number;
    email: string;
    isEmailConfirmed: boolean;
    name: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}
export interface UserExtInterface extends UserInterface {
    phones: PhoneInterface[];
}
