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

export interface PropsAssignedInterface {
    propId: number;
    title: string;
    comment: string;
    pos: number;
    isRequire: boolean;
    isCanAsFilter: boolean;
}

export class PropsAssigned implements PropsAssignedInterface {
    propId: number = 0;
    title: string = '';
    comment: string = '';
    pos: number = 1;
    isRequire: boolean = false;
    isCanAsFilter: boolean = false;

    constructor(x: PropFullInterface) {
        this.propId = x.propId;
        this.title = x.title + (x.privateComment ? ` (${x.privateComment})` : '');
        this.comment = x.propComment;
        this.pos = x.propPos;
        this.isRequire = x.propIsRequire;
        this.isCanAsFilter = x.propIsCanAsFilter;
    }
}
