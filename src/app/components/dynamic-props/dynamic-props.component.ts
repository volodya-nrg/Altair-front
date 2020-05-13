import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';
import {PropInterface} from '../../interfaces/response/prop';
import {ManagerService} from '../../services/manager.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-dynamic-props',
    templateUrl: './dynamic-props.component.html',
    styleUrls: ['./dynamic-props.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamicPropsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    props: PropInterface[] = [];
    @ViewChild('select', {static: true}) select: ElementRef;
    @Input() propsFormArray: FormArray;

    constructor(
        private fb: FormBuilder,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm block-props');

        const s = this.serviceManager.settings$.subscribe(
            x => this.props = x.props,
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy adm block-props');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    addItem(): void {
        let propId: number = parseInt(this.select.nativeElement.value, 10);

        if (!propId) {
            return;
        }

        this.props.forEach(x => {
            if (x.propId !== propId) {
                return;
            }
            this.propsFormArray.push(this.fb.group({
                propId: x.propId,
                title: x.title,
                kindPropId: x.kindPropId,
                name: x.name,
                suffix: x.suffix,
                comment: x.comment,
                privateComment: x.privateComment,
                kindPropName: '',
                propPos: this.propsFormArray.length,
                propIsRequire: false,
                propIsCanAsFilter: false,
                propComment: '',
                values: [],
            }));
            return false; // только один раз
        });

        this.select.nativeElement.value = 0;
    }

    isSelected(id: number): boolean {
        let result: boolean = false;

        this.propsFormArray.controls.forEach(x => {
            if (x.get('propId').value === id) {
                result = true;
                return false;
            }
        });

        return result;
    }
}
