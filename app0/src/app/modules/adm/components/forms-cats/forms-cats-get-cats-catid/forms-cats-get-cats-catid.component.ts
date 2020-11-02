import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SettingsInterface} from '../../../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {CatService} from '../../../../../services/cat.service';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-cats-get-cats-catid',
    templateUrl: './forms-cats-get-cats-catid.component.html',
    styleUrls: ['./forms-cats-get-cats-catid.component.less'],
})
export class FormsCatsGetCatsCatidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formGetCatsCatID: FormGroup;
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
        this.formGetCatsCatID = this.fb.group({
            catID: 0,
            withPropsOnlyFiltered: false,
        });
        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetCatsCatID({target}): void {
        if (this.formGetCatsCatID.invalid) {
            for (const key of Object.keys(this.formGetCatsCatID.controls)) {
                const formControl = this.formGetCatsCatID.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catID: number = parseInt(this.formGetCatsCatID.get('catID').value, 10);
        const isWithPropsOnlyFiltered: boolean = this.formGetCatsCatID.get('withPropsOnlyFiltered').value;
        const s = this.serviceCats.getOne(catID, isWithPropsOnlyFiltered).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}
