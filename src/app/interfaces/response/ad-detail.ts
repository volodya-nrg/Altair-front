export interface AdDetailInterface {
    adId: number;
    propertyId: number;
    value: string;
}

export interface AdDetailExtInterface extends AdDetailInterface, AdDetailDopInterface {
}

interface AdDetailDopInterface {
    propertyName: string;
    kindPropertyName: string;
}
