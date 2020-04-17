import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CatService} from '../../services/cat.service';
import {Subscription} from 'rxjs';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscription: Subscription;
    private subscriptions: Subscription[] = [];
    private links: Array<HTMLBaseElement> = [];
    private catTree: CatTreeInterface;
    private detachClick: () => void;
    isActive: boolean = false;
    catTreeHTML: string = '';
    @ViewChild('nav', {static: true}) nav: ElementRef;
    @ViewChild('button', {static: true}) button: ElementRef;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private catService: CatService
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
        this.toggleEventOnLink(false);
    }

    ngAfterViewInit() {
        this.subscription = this.catService.getTree(false).subscribe(x => {
            this.catTree = x;
            this.catTreeHTML = this.walkOnCats(this.catTree.childes, '/cat');
            setTimeout(() => this.toggleEventOnLink(true), 0);
        });
        this.subscriptions.push(this.subscription);
    }

    toggleEventOnLink(isAdd: boolean): void {
        if (!this.links.length) {
            const elements = this.nav.nativeElement.querySelectorAll('a');
            console.log(elements);
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
        var matches = grandFather.querySelectorAll(':scope > li > a');
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
