import {ValuePropInterface} from './value-prop';

export interface PropInterface {
    propId: number;
    title: string;
    kindPropId: number;
    name: string;
    suffix: string;
    comment: string;
    privateComment: string;
}

export interface PropFullInterface extends PropInterface, PropDopInterface {
}

interface PropDopInterface {
    kindPropName: string;
    propPos: number;
    propIsRequire: boolean;
    propIsCanAsFilter: boolean;
    propComment: string;
    values: ValuePropInterface[];
}
