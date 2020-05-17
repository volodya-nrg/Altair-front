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
    latitude: number;
    longitude: number;
    cityName: string;
    countryName: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdFullInterface extends AdInterface, AdDopInterface {
}

export interface AdDetailInterface {
    adId: number;
    propId: number;
    value: string;
}

export interface AdDetailExtInterface extends AdDetailInterface, ExtInterface {
}

interface ExtInterface {
    propName: string;
    kindPropName: string;
    valueName: string;
}

interface AdDopInterface {
    images: ImageInterface[];
    detailsExt: AdDetailExtInterface[];
}
