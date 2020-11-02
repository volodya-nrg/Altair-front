import {ValuePropInterface} from './value-prop';

export interface PropInterface {
    propID: number;
    title: string;
    kindPropID: number;
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

export interface PropAssignedForCatInterface {
    propID: number;
    title: string;
    comment: string;
    pos: number;
    isRequire: boolean;
    isCanAsFilter: boolean;
}

export class PropsAssignedForCat implements PropAssignedForCatInterface {
    propID = 0;
    title = '';
    comment = '';
    pos = 1;
    isRequire = false;
    isCanAsFilter = false;

    constructor(x: PropFullInterface) {
        this.propID = x.propID;
        this.title = x.title + (x.privateComment ? ` (${x.privateComment})` : '');
        this.comment = x.propComment;
        this.pos = x.propPos;
        this.isRequire = x.propIsRequire;
        this.isCanAsFilter = x.propIsCanAsFilter;
    }
}
