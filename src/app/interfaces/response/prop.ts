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
export interface PropWithKindNameInterface extends PropInterface, PropDop2Interface {
}

interface PropDopInterface {
    kindPropName: string;
    propPos: number;
    propIsRequire: boolean;
    propIsCanAsFilter: boolean;
    propComment: string;
    values: ValuePropInterface[];
}
interface PropDop2Interface {
    kindPropName: string;
}
