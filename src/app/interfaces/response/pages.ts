import {AdFullInterface} from './ad';
import {CatFullInterface} from './cat';

export interface PagesAdInterface {
    adFull: AdFullInterface;
    catFull: CatFullInterface;
}

export interface PagesMainInterface {
    lastAdsFull: AdFullInterface[]
}
