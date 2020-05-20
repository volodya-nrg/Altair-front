import {PropFull, PropFullInterface} from './prop';

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

export interface CatWithDeepInterface extends CatInterface, WithDeepInterface {
}

interface ChildesInterface {
    childes: CatTreeInterface[];
}

interface ChildesFullInterface {
    childes: CatTreeFullInterface[];
}

interface PropsFullInterface {
    props: PropFullInterface[];
}

interface WithDeepInterface {
    deep: number;
}

export class CatFull {
    catId: number = 0;
    name: string = '';
    slug: string = '';
    parentId: number = 0;
    pos: number = 0;
    isDisabled: boolean = false;
    priceAlias: string = '';
    priceSuffix: string = '';
    titleHelp: string = '';
    titleComment: string = '';
    isAutogenerateTitle: boolean = false;
    props: PropFull[] = [];
}
