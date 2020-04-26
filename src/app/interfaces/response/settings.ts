import {CatTreeInterface} from './cat';
import {PropertyInterface} from './property';
import {KindPropertyInterface} from './kind-property';

export interface SettingsInterface {
    catsTree: CatTreeInterface,
    kindProperties: KindPropertyInterface[],
    properties: PropertyInterface[],
}
