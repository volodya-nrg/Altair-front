import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';
import {PropInterface} from '../../interfaces/response/prop';
import {DynamicPropInterface} from '../../interfaces/dynamic-prop';
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
    dynamicProps: DynamicPropInterface[] = [];
    @ViewChild('select', {static: true}) select: ElementRef;
    @Input() propsFormArray: FormArray;

    // @ts-ignore
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
                name: x.title + (x.privateComment ? '(' + x.privateComment + ')' : ''),
                propId: x.propId,
                privateComment: x.privateComment,
                propPos: this.propsFormArray.length,
                propIsRequire: false,
                propIsCanAsFilter: false,
                propComment: x.comment,
            }));
        });

        this.updateSelect();
    }

    updateSelect(): void {
        this.select.nativeElement.querySelectorAll('option').forEach(x => {
            x.disabled = false;
        });
        this.propsFormArray.controls.forEach(x => {
            const val = x.get('propId').value;
            this.select.nativeElement.querySelector(`option[value="${val}"]`).disabled = true;
        });
        this.select.nativeElement.value = 0; // сброси на начало
    }
}
