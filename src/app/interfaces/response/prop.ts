import {ValueProp, ValuePropInterface} from './value-prop';

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

export class PropFull {
    propId: number = 0;
    title: string = '';
    kindPropId: number = 0;
    name: string = '';
    suffix: string = '';
    comment: string = '';
    privateComment: string = '';
    kindPropName: string = '';
    propPos: number = 0;
    propIsRequire: boolean = false;
    propIsCanAsFilter: boolean = false;
    propComment: string = '';
    values: ValueProp[] = [];
}
