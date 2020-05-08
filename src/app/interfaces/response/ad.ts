import {AdDetailExtInterface} from './ad-detail';
import {ImageInterface} from './image';

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
    isApproved: boolean;
    hasPhoto: boolean;
    youtube: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdFullInterface extends AdInterface, AdDopInterface {
}

interface AdDopInterface {
    images: ImageInterface[];
    detailsExt: AdDetailExtInterface[];
}
