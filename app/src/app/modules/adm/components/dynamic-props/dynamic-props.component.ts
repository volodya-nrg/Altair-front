import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';
import {PropFullInterface, PropInterface, PropsAssignedForCat} from '../../../../interfaces/response/prop';
import {ManagerService} from '../../../../services/manager.service';

@Component({
    selector: 'app-dynamic-props',
    templateUrl: './dynamic-props.component.html',
    styleUrls: ['./dynamic-props.component.less'],
})
export class DynamicPropsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    propsReserv: PropInterface[] = [];
    @Input() propsAssignedFormArray: FormArray;
    @ViewChild('select', {static: true}) select: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        const s = this.serviceManager.settings$.subscribe(x => this.propsReserv = x.props);
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    addItem(): void {
        let propId: number = parseInt(this.select.nativeElement.value, 10);

        if (!propId) {
            return;
        }

        this.propsReserv.forEach((x, i) => {
            if (x.propId !== propId) {
                return;
            }

            const tmp: PropFullInterface = {
                propId: x.propId,
                title: x.title,
                comment: x.comment,
                propPos: this.propsAssignedFormArray.length + 1,
                privateComment: x.privateComment,
                propIsRequire: false,
                propIsCanAsFilter: false,
                kindPropId: 0,
                name: '',
                suffix: '',
                kindPropName: '',
                propComment: '',
                values: [],
            };
            this.propsAssignedFormArray.push(this.fb.group(new PropsAssignedForCat(tmp)));
            return false; // только один раз
        });

        this.select.nativeElement.value = 0;
    }

    isSelected(id: number): boolean {
        let result: boolean = false;

        if (!this.propsAssignedFormArray.length) {
            return result;
        }

        this.propsAssignedFormArray.controls.forEach(x => {
            if (x.get('propId').value === id) {
                result = true;
                return false;
            }
        });

        return result;
    }
}
