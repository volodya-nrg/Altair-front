import {PropFullInterface} from './prop';

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
