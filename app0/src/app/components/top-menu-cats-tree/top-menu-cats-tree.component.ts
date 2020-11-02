import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CatService} from '../../services/cat.service';
import {Subscription} from 'rxjs';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {ManagerService} from '../../services/manager.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-top-menu-cats-tree',
    templateUrl: './top-menu-cats-tree.component.html',
    styleUrls: ['./top-menu-cats-tree.component.less'],
})
export class TopMenuCatsTreeComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private detachClick: () => void;
    isActive = false;
    catTree: CatTreeInterface;
    @ViewChild('button', {static: true}) button: ElementRef;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private serviceCat: CatService,
        private serviceManager: ManagerService,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformID)) {
            const s = this.serviceManager.settings$.subscribe(x => this.catTree = x.catsTree);
            this.subscriptions.push(s);
        }
    }

    ngOnDestroy(): void {
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
            const inZone = e.target.closest('.top-menu-cats-tree_tree');

            if (e.target !== this.button.nativeElement && !inZone || e.target.classList.contains('tree-in-the-top_go')) {
                this.hideMenu();
            }
        });
    }

    hideMenu(): void {
        this.isActive = false;
        this.detachClick();
    }
}
