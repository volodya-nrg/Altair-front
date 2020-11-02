import {ImageInterface} from './image';

export interface AdInterface {
    adID: number;
    title: string;
    slug: string;
    catID: number;
    userID: number;
    description: string;
    price: number;
    IP: string;
    isDisabled: boolean;
    isApproved: boolean;
    hasPhoto: boolean;
    youtube: string;
    latitude: number;
    longitude: number;
    cityName: string;
    countryName: string;
    phoneID: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdFullInterface extends AdInterface, AdDopInterface {
}

export interface AdDetailInterface {
    adID: number;
    propID: number;
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
