import {ValuePropertyInterface} from './value-property';

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
export interface PropertyWithKindNameInterface extends PropertyInterface, PropertyDop2Interface {
}

interface PropertyDopInterface {
    kindPropertyName: string;
    propertyPos: number;
    propertyIsRequire: boolean;
    propertyIsCanAsFilter: boolean;
    propertyComment: string;
    values: ValuePropertyInterface[];
}
interface PropertyDop2Interface {
    kindPropertyName: string;
}
