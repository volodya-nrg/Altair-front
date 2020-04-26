import {AdDetailInterface} from './ad-detail';
import {ImageInterface} from './image';
import {PropertyFullInterface} from './property';

export interface AdInterface {
    adId: number;
    title: string;
    slug: string;
    catId: number;
    userId: number;
    description: string;
    price: number;
    ip: string;
    isDisabled: boolean;
    hasPhoto: boolean;
    youtube: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdFullInterface extends AdInterface, AdDopInterface {
}

interface AdDopInterface {
    images: ImageInterface[];
    details: AdDetailInterface[];
    propertiesFull: PropertyFullInterface[];
}