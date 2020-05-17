import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SettingsInterface} from '../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../interfaces/response/cat';
import {CatService} from '../../../services/cat.service';
import {ManagerService} from '../../../services/manager.service';
import {Helpers} from '../../../helpers';

@Component({
    selector: 'app-forms-cats-get-cats-catid',
    templateUrl: './forms-cats-get-cats-catid.component.html',
    styleUrls: ['./forms-cats-get-cats-catid.component.less'],
})
export class FormsCatsGetCatsCatidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formGetCatsCatId: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm cats');

        this.formGetCatsCatId = this.fb.group({
            catId: 0,
            withPropsOnlyFiltered: false,
        });
        const s = this.serviceManager.settings$.subscribe(
            x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree),
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy adm cats');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetCatsCatId({target}): void {
        if (this.formGetCatsCatId.invalid) {
            for (let key in this.formGetCatsCatId.controls) {
                const formControl = this.formGetCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catId: number = parseInt(this.formGetCatsCatId.get('catId').value, 10);
        const isWithPropsOnlyFiltered: boolean = this.formGetCatsCatId.get('withPropsOnlyFiltered').value;
        const s = this.serviceCats.getCatId(catId, isWithPropsOnlyFiltered).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}
