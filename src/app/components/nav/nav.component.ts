import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CatService} from '../../services/cat.service';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {Helpers} from '../../helpers';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private detachClick: () => void;
    isActive: boolean = false;
    catTree: CatTreeInterface;
    @ViewChild('button', {static: true}) button: ElementRef;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private serviceCat: CatService,
        private settingsService: SettingsService,
    ) {
    }

    ngOnInit(): void {
        console.log('init navComponent');
        const s = this.settingsService.settings.subscribe(
            x => this.catTree = x.catsTree,
            err => Helpers.handleErr(err),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy navComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit() {
    }

    toggleMenu(): void {
        !this.isActive ? this.openMenu() : this.hideMenu();
    }

    openMenu(): void {
        this.isActive = true;
        this.detachClick = this.renderer.listen('document', 'click', (e) => {
            const inZone = e.target.closest('.nav_tree');

            if (e.target != this.button.nativeElement && !inZone || e.target.classList.contains('tree-in-the-top_go')) {
                this.hideMenu();
            }
        });
    }

    hideMenu(): void {
        this.isActive = false;
        this.detachClick();
    }
}
