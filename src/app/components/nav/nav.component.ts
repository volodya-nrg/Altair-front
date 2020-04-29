import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CatService} from '../../services/cat.service';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {SettingsInterface} from '../../interfaces/response/settings';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private links: HTMLBaseElement[] = [];
    private detachClick: () => void;
    isActive: boolean = false;
    catTreeHTML: string = '';
    @ViewChild('nav', {static: true}) nav: ElementRef;
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
    }

    ngOnDestroy(): void {
        console.log('destroy navComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.toggleEventOnLink(false);
    }

    ngAfterViewInit() {
        const s = this.settingsService.settings.subscribe(
            x => {
                this.start(x);
            },
            err => Helpers.handleErr(err),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    start(settings: SettingsInterface): void {
        this.catTreeHTML = this.walkOnCats(settings.catsTree.childes, '/cat');
        setTimeout(() => this.toggleEventOnLink(true), 0);
    }

    toggleEventOnLink(isAdd: boolean): void {
        if (!this.links.length) {
            const elements = this.nav.nativeElement.querySelectorAll('a');
            for (let element of elements) {
                this.links.push(element);
            }
        }

        for (let i = 0; i < this.links.length; i++) {
            if (isAdd) {
                this.links[i].addEventListener('click', (e) => this.onClickToLink(e));
            } else {
                this.links[i].removeEventListener('click', null);
            }
        }

        if (!isAdd) {
            this.links.length = 0;
        }
    }

    onClickToLink({target}): void {
        var brothers = target.parentNode.querySelector(':scope > ul');

        if (!brothers) {
            const url = target.getAttribute('routerLink');
            this.router.navigate([url]).then((ok) => {
                ok ? this.hideMenu() : alert('Error in route navigate');
            });
            return;
        }

        var grandFather = target.closest('ul');
        var matches = grandFather.querySelectorAll(':scope > li > a.sx-active');
        for (let elem of matches) {
            elem.classList.remove('sx-active');
        }

        target.classList.add('sx-active');
    }

    toggleMenu(): void {
        !this.isActive ? this.openMenu() : this.hideMenu();
    }

    openMenu(): void {
        this.isActive = true;
        this.detachClick = this.renderer.listen('document', 'click', (e) => {
            const inZone = e.target.closest('.nav_tree');
            if (e.target != this.button.nativeElement && !inZone) {
                this.hideMenu();
            }
        });
    }

    hideMenu(): void {
        this.isActive = false;

        this.detachClick();
        for (let i = 0; i < this.links.length; i++) {
            this.links[i].classList.remove('sx-active');
        }
    }

    walkOnCats(aCats, url): string {
        let result = '<ul>';

        for (let cat of aCats) {
            const urlNew = url + '/' + cat.slug;
            const hasChildes = cat.childes && cat.childes.length;
            const sxHasChilds = hasChildes ? ' sx-has-childes' : '';
            const routerLink = !hasChildes ? ' routerLink="' + urlNew + '"' : '';
            const href = !hasChildes ? ' href="javascript:void(0);"' : '';

            result += '<li><a class="text-eclipse' + sxHasChilds + '"' + routerLink + href + ' title="' + cat.name + '">' + cat.name + '</a>';


            if (hasChildes) {
                result += this.walkOnCats(cat.childes, urlNew);
            }

            result += '</li>';
        }

        result += '</ul>';

        return result;
    }
}
