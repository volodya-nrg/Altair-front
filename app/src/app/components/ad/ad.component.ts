import {Component, Input} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less'],
})
export class AdComponent {
    @Input() ad: AdFullInterface = null;
    @Input() viewOpt: string = '';
    @Input() inProfile: boolean = false;
}
