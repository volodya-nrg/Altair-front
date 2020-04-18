import {ValuePropertyInterface} from './value_property';

export interface PropertyInterface {
    propertyId: number;
    title: string;
    kindPropertyId: number;
    name: string;
    suffix: string;
    comment: string;
    privateComment: string;
}

export interface PropertyFullInterface extends PropertyInterface, PropertyDopInterface {
}

interface PropertyDopInterface {
    kindPropertyName: string;
    propertyPos: number;
    isRequire: boolean;
    isCanAsFilter: boolean;
    comment: string;
    values: ValuePropertyInterface[];
}
