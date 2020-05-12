import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Helpers} from '../../../../helpers';
import {ManagerService} from '../../../../services/manager.service';
import {Subscription} from 'rxjs';
import {PropFullInterface, PropInterface} from '../../../../interfaces/response/prop';
import {BlockPropsInterface} from '../../interfaces/block-props';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-block-props',
    templateUrl: './block-props.component.html',
    styleUrls: ['./block-props.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class BlockPropsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    props: PropInterface[] = [];
    list: BlockPropsInterface[] = [];
    @ViewChild('select', {static: true}) select: ElementRef;
    @Input() outForm: FormGroup;

    constructor(
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

    add(): void {
        let propId: number = parseInt(this.select.nativeElement.value, 10);

        if (!propId) {
            return;
        }

        this.props.forEach(x => {
            if (x.propId !== propId) {
                return;
            }

            this.list.push({
                propId: x.propId,
                title: x.title + (x.privateComment ? ' (' + x.privateComment + ')' : '')
            });

            this.outForm.addControl('propId[' + x.propId + ']', new FormControl(x.propId));
            this.outForm.addControl('propComment[' + x.propId + ']', new FormControl(''));
            this.outForm.addControl('propPos[' + x.propId + ']', new FormControl(this.list.length));
            this.outForm.addControl('propIsRequire[' + x.propId + ']', new FormControl(false));
            this.outForm.addControl('propIsCanAsFilter[' + x.propId + ']', new FormControl(false));
        });

        this.updateSelect();
    }

    remove(itemId: number): void {
        this.list.forEach((x, i) => {
            if (x.propId === itemId) {
                this.list.splice(i, 1);

                this.outForm.removeControl('propId[' + x.propId + ']');
                this.outForm.removeControl('propComment[' + x.propId + ']');
                this.outForm.removeControl('propPos[' + x.propId + ']');
                this.outForm.removeControl('propIsRequire[' + x.propId + ']');
                this.outForm.removeControl('propIsCanAsFilter[' + x.propId + ']');
                return false;
            }
        });

        this.updateSelect();
    }

    setPropsFull(propsFull: PropFullInterface[]): void {
        console.log(this.list.length);
        this.list.length = 0;

        for (let controlsKey in this.outForm.controls) {
            if (controlsKey.substr(0, 'propId['.length) === 'propId[') {
                this.outForm.removeControl(controlsKey);
            } else if (controlsKey.substr(0, 'propComment['.length) === 'propComment[') {
                this.outForm.removeControl(controlsKey);
            } else if (controlsKey.substr(0, 'propPos['.length) === 'propPos[') {
                this.outForm.removeControl(controlsKey);
            } else if (controlsKey.substr(0, 'propIsRequire['.length) === 'propIsRequire[') {
                this.outForm.removeControl(controlsKey);
            } else if (controlsKey.substr(0, 'propIsCanAsFilter['.length) === 'propIsCanAsFilter[') {
                this.outForm.removeControl(controlsKey);
            }
        }

        propsFull.forEach(x => {
            this.list.push({
                propId: x.propId,
                title: x.title + (x.privateComment ? ' (' + x.privateComment + ')' : ''),
            });

            this.outForm.addControl('propId[' + x.propId + ']', new FormControl(x.propId));
            this.outForm.addControl('propComment[' + x.propId + ']', new FormControl(x.propComment));
            this.outForm.addControl('propPos[' + x.propId + ']', new FormControl(x.propPos));
            this.outForm.addControl('propIsRequire[' + x.propId + ']', new FormControl(x.propIsRequire));
            this.outForm.addControl('propIsCanAsFilter[' + x.propId + ']', new FormControl(x.propIsCanAsFilter));
        });

        this.updateSelect();
    }

    updateSelect(): void {
        this.select.nativeElement.querySelectorAll('option').forEach(x => {
            x.disabled = false;
        });
        this.list.forEach(x => {
            this.select.nativeElement.querySelector('option[value="' + x.propId + '"]').disabled = true;
        });
        this.select.nativeElement.value = 0; // сброси на начало
    }
}
