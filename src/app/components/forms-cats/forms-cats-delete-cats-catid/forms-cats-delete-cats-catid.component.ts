import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {CatService} from '../../../services/cat.service';
import {ManagerService} from '../../../services/manager.service';
import {CatWithDeepInterface} from '../../../interfaces/response/cat';

@Component({
    selector: 'app-forms-cats-delete-cats-catid',
    templateUrl: './forms-cats-delete-cats-catid.component.html',
    styleUrls: ['./forms-cats-delete-cats-catid.component.less'],
    encapsulation: ViewEncapsulation.None,
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
        console.log('init forms cats delete cats catid');

        this.formDeleteCatsCatId = this.fb.group({
            catId: 0,
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

        const s = this.serviceCats.delete(this.formDeleteCatsCatId.get('catId').value).subscribe(
            x => {
                this.json.emit(x);
                target.reset();
                this.formDeleteCatsCatId.reset();
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}
