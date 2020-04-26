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
