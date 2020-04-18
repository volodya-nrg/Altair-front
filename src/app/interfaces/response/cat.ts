import {PropertyFullInterface} from './property';

export interface CatInterface {
    catId: number;
    name: string;
    slug: string;
    parentId: number;
    pos: number;
    isDisabled: boolean;
    priceAlias: string;
    priceSuffix: string;
    titleHelp: string;
    titleComment: string;
    isAutogenerateTitle: boolean;
}

export interface CatTreeInterface extends CatInterface, ChildesInterface {
}

export interface CatFullInterface extends CatInterface, PropsFullInterface {
}

export interface CatTreeFullInterface extends CatFullInterface, ChildesFullInterface {
}

interface ChildesInterface {
    childes: CatTreeInterface[];
}

interface ChildesFullInterface {
    childes: CatTreeFullInterface[];
}

interface PropsFullInterface {
    properties: PropertyFullInterface[];
}
