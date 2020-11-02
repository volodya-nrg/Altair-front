import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {CatsHorizAccordionComponent} from '../cats-horiz-accordion/cats-horiz-accordion.component';
import {EmitCatsHorizAccordionInterface} from '../../interfaces/emit-cats-horiz-accordion';
import {AdFormComponent} from '../ad-form/ad-form.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-ad-create-edit',
    templateUrl: './page-ad-create-edit.component.html',
    styleUrls: ['./page-ad-create-edit.component.less'],
})
export class PageAdCreateEditComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    isEditingAd = false;
    @ViewChild(CatsHorizAccordionComponent) catsHorizAccordion: CatsHorizAccordionComponent;
    @ViewChild(AdFormComponent) adForm: AdFormComponent;

    constructor(
        private route: ActivatedRoute,
        private serviceProfile: ProfileService,
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Новое объявление - Объявления на сайте Altair');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
        const sAdID: string = this.route.snapshot.paramMap.get('adID');

        if (sAdID) {
            const adID: number = parseInt(sAdID, 10);

            if (!isNaN(adID)) {
                const s = this.serviceProfile.getAd(adID).subscribe(
                    x => {
                        this.catsHorizAccordion.render(x.catID, null);
                        this.adForm.ad = x;
                        this.isEditingAd = true;
                        this.serviceTitle.setTitle(this.adForm.ad.title);
                    },
                    err => s.unsubscribe(),
                    () => s.unsubscribe()
                );
            }
        }
    }

    selectLeaf(signal: EmitCatsHorizAccordionInterface): void {
        this.adForm.newCatID = signal.cat.catID;
    }
}
