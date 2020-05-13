import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Helpers} from '../../../../helpers';
import {ManagerService} from '../../../../services/manager.service';
import {Subscription} from 'rxjs';
import {PropFullInterface, PropInterface} from '../../../../interfaces/response/prop';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-block-props',
    templateUrl: './block-props.component.html',
    styleUrls: ['./block-props.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class BlockPropsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    props: PropInterface[] = [];
    @ViewChild('select', {static: true}) select: ElementRef;
    @Input() itemsFormArray: FormArray;

    constructor(
        private fb: FormBuilder,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm block-props');

        const s = this.serviceManager.settings$.subscribe(
            x => {
                this.props = x.props;
            },
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

            this.itemsFormArray.push(new FormGroup({
                propId: new FormControl(propId, Validators.required),
                title: new FormControl(''),
                kindPropId: new FormControl(0),
                name: new FormControl(''),
                suffix: new FormControl(''),
                comment: new FormControl(''),
                privateComment: new FormControl(''),
                kindPropName: new FormControl(''),
                propPos: new FormControl(this.itemsFormArray.length),
                propIsRequire: new FormControl(false),
                propIsCanAsFilter: new FormControl(false),
                propComment: new FormControl(''),
            }));
        });

        this.updateSelect();
    }

    updateSelect(): void {
        this.select.nativeElement.querySelectorAll('option').forEach(x => {
            x.disabled = false;
        });
        // this.propsFullFormArray.controls.forEach(x => {
        //     console.log(x);
        //     //this.select.nativeElement.querySelector('option[value="' + x.propId + '"]').disabled = true;
        // });
        this.select.nativeElement.value = 0; // сброси на начало
    }
}
