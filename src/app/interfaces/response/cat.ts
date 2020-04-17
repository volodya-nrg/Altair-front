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

interface ChildesInterface {
    childes: CatTreeInterface[];
}

export interface CatTreeInterface extends CatInterface, ChildesInterface {
}
