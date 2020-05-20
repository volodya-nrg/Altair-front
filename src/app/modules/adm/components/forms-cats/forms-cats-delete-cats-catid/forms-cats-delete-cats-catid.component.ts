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
export class FormsCatsDeleteCatsCatidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formDeleteCatsCatId: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.formDeleteCatsCatId = this.fb.group({
            catId: 0,
        });
        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormDeleteCatsCatId({target}): void {
        if (this.formDeleteCatsCatId.invalid) {
            for (let key in this.formDeleteCatsCatId.controls) {
                const formControl = this.formDeleteCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.delete(this.formDeleteCatsCatId.get('catId').value).subscribe(x => {
            this.json.emit(x);
            target.reset();
            this.formDeleteCatsCatId.reset();
        });
        this.subscriptions.push(s);
    }
}