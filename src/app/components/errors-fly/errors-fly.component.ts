import {Component, OnInit} from '@angular/core';
import {MyErrorService} from '../../services/my-error.service';
import {MyErrorInterface} from '../../interfaces/my-error';

@Component({
    selector: 'app-errors-fly',
    templateUrl: './errors-fly.component.html',
    styleUrls: ['./errors-fly.component.less']
})
export class ErrorsFlyComponent implements OnInit {
    private waitTimeSec: number = 5;
    items: MyErrorInterface[] = [];

    constructor(
        private serviceMyErrors: MyErrorService,
    ) {
    }

    ngOnInit(): void {
        this.serviceMyErrors.errors$.subscribe(x => {
            this.items.push(x);
            setTimeout(() => this.remove(this.items.length - 1), this.waitTimeSec * 1000);
        });
    }

    remove(i: number): void {
        if (this.items[i]) {
            return;
        }

        this.items.splice(i, 1);
    }
}
