import {Component, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
    emailSupport: string = environment.emailSupport;
    curYear: number = environment.curYear;

    constructor() {
    }
}
