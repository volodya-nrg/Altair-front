import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MyErrorService} from '../../services/my-error.service';
import {MyErrorInterface} from '../../interfaces/my-error';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-errors-fly',
    templateUrl: './errors-fly.component.html',
    styleUrls: ['./errors-fly.component.less']
})
export class ErrorsFlyComponent implements OnInit {
    items: MyErrorInterface[] = [];

    constructor(
        private serviceMyErrors: MyErrorService,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    }

    ngOnInit(): void {
        this.serviceMyErrors.errors$.subscribe(x => {
            this.items.push(x);

            if (isPlatformBrowser(this.platformId)) {
                setTimeout(() => this.remove(x), environment.timeSecWaitErrorFly * 1000);
            }
        });
    }

    remove(target: MyErrorInterface): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === target) {
                this.items.splice(i, 1);
                break;
            }
        }
    }
}
