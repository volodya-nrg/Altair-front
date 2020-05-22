import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {CatsHorizAccordionComponent} from '../cats-horiz-accordion/cats-horiz-accordion.component';
import {EmitCatsHorizAccordionInterface} from '../../interfaces/emit-cats-horiz-accordion';
import {AdFormComponent} from '../ad-form/ad-form.component';

@Component({
    selector: 'app-page-ad-create-edit',
    templateUrl: './page-ad-create-edit.component.html',
    styleUrls: ['./page-ad-create-edit.component.less'],
})
export class PageAdCreateEditComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    isEditingAd: boolean = false;
    @ViewChild(CatsHorizAccordionComponent) catsHorizAccordion: CatsHorizAccordionComponent;
    @ViewChild(AdFormComponent) adForm: AdFormComponent;

    constructor(
        private route: ActivatedRoute,
        private serviceProfile: ProfileService,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
        let sAdId: string = this.route.snapshot.paramMap.get('adId');

        if (sAdId) {
            let adId: number = parseInt(sAdId, 10);

            if (!isNaN(adId)) {
                const s = this.serviceProfile.getAd(adId).subscribe(
                    x => {
                        this.catsHorizAccordion.render(x.catId, null);
                        this.adForm.ad = x;
                        this.isEditingAd = true;
                    },
                    err => s.unsubscribe(),
                    () => s.unsubscribe()
                );
            }
        }
    };

    selectLeaf(signal: EmitCatsHorizAccordionInterface): void {
        console.log(3333);
        this.adForm.newCatId = signal.cat.catId;
    }
}
