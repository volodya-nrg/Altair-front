import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {ManagerService} from '../../../../../services/manager.service';
import {CatService} from '../../../../../services/cat.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-cats-delete-cats-catid',
    templateUrl: './forms-cats-delete-cats-catid.component.html',
    styleUrls: ['./forms-cats-delete-cats-catid.component.less'],
})
export class FormsCatsDeleteCatsCatIDComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formDeleteCatsCatID: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.formDeleteCatsCatID = this.fb.group({
            catID: 0,
        });
        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormDeleteCatsCatID({target}): void {
        if (this.formDeleteCatsCatID.invalid) {
            for (const key of Object.keys(this.formDeleteCatsCatID.controls)) {
                const formControl = this.formDeleteCatsCatID.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.delete(this.formDeleteCatsCatID.get('catID').value).subscribe(x => {
            this.json.emit(x);
            target.reset();
            this.formDeleteCatsCatID.reset();
        });
        this.subscriptions.push(s);
    }
}
