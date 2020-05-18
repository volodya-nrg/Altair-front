import {Component, Input} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less'],
})
export class AdComponent {
    url: string = environment.apiUrl;
    @Input() ad: AdFullInterface;
    @Input() viewOpt: string;
    @Input() inProfile: boolean = false;
}
