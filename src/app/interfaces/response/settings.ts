import {CatTreeInterface} from './cat';
import {KindPropertyInterface} from './kind-property';
import {PropertyInterface} from './property';

export interface SettingsInterface {
    catsTree: CatTreeInterface,
    kindProperties: KindPropertyInterface[],
    properties: PropertyInterface[],
}
