import {CatTreeInterface} from './cat';
import {PropInterface} from './prop';
import {KindPropInterface} from './kind-prop';

export interface SettingsInterface {
    catsTree: CatTreeInterface;
    kindProps: KindPropInterface[];
    props: PropInterface[];
}
