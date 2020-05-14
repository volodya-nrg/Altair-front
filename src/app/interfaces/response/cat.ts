import {PropFullInterface} from './prop';
import {FormArray} from '@angular/forms';

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

export class Cat {
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
}

export class CatFull extends Cat {
    props: FormArray;
}

export class CatWithDeep extends Cat {
    deep: number;

    constructor(x: CatTreeInterface, deep: number) {
        super();

        this.catId = x.catId;
        this.name = x.name;
        this.slug = x.slug;
        this.parentId = x.parentId;
        this.pos = x.pos;
        this.isDisabled = x.isDisabled;
        this.priceAlias = x.priceAlias;
        this.priceSuffix = x.priceSuffix;
        this.titleHelp = x.titleHelp;
        this.titleComment = x.titleComment;
        this.isAutogenerateTitle = x.isAutogenerateTitle;
        this.deep = deep;
    }
}
