import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-page-check-email-through-hash',
    templateUrl: './page-check-email-through-hash.component.html',
    styleUrls: ['./page-check-email-through-hash.component.less']
})
export class PageCheckEmailThroughHashComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    isLoading: boolean = false;
    result: number = -1;

    constructor(
        private serviceProfile: ProfileService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        let hash: string = this.route.snapshot.paramMap.get('hash');

        if (hash) {
            this.isLoading = true;
            const s = this.serviceProfile.checkEmailThroughHash(hash).subscribe(
                x => this.result = 1,
                err => {
                    this.isLoading = false;
                    this.result = 0;
                },
                () => {
                    this.isLoading = false;
                }
            );
            this.subscriptions.push(s);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}
