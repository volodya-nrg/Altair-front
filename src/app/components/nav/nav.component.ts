import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    private links: Array<HTMLBaseElement> = [];
    private catTree = {
        'childes': [
            {
                'catId': 51,
                'name': 'Категория1',
                'slug': 'kategoriia1',
                'parentId': 0,
                'pos': 1,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 54,
                        'name': 'Категория1-1',
                        'slug': 'kategoriia1-1',
                        'parentId': 51,
                        'pos': 1,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 57,
                                'name': 'Категория1-1-1',
                                'slug': 'kategoriia1-1-1',
                                'parentId': 54,
                                'pos': 1,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 58,
                                'name': 'Категория1-1-2',
                                'slug': 'kategoriia1-1-2',
                                'parentId': 54,
                                'pos': 2,
                                'isDisabled': false,
                                'childes': null
                            },
                            {
                                'catId': 59,
                                'name': 'Категория1-1-3',
                                'slug': 'kategoriia1-1-3',
                                'parentId': 54,
                                'pos': 3,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 55,
                        'name': 'Категория1-2',
                        'slug': 'kategoriia1-2',
                        'parentId': 51,
                        'pos': 2,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 60,
                                'name': 'Категория1-2-1',
                                'slug': 'kategoriia1-2-1',
                                'parentId': 55,
                                'pos': 1,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    },
                    {
                        'catId': 56,
                        'name': 'Категория1-3',
                        'slug': 'kategoriia1-3',
                        'parentId': 51,
                        'pos': 3,
                        'isDisabled': false,
                        'childes': null
                    }
                ]
            },
            {
                'catId': 52,
                'name': 'Категория2',
                'slug': 'kategoriia2',
                'parentId': 0,
                'pos': 2,
                'isDisabled': false,
                'childes': [
                    {
                        'catId': 61,
                        'name': 'Категория2-1',
                        'slug': 'kategoriia2-1',
                        'parentId': 52,
                        'pos': 1,
                        'isDisabled': false,
                        'childes': null
                    },
                    {
                        'catId': 62,
                        'name': 'Категория2-2',
                        'slug': 'kategoriia2-2',
                        'parentId': 52,
                        'pos': 2,
                        'isDisabled': false,
                        'childes': [
                            {
                                'catId': 63,
                                'name': 'Категория2-2-1',
                                'slug': 'kategoriia2-2-1',
                                'parentId': 62,
                                'pos': 1,
                                'isDisabled': false,
                                'childes': null
                            }
                        ]
                    }
                ]
            },
            {
                'catId': 53,
                'name': 'Категория3',
                'slug': 'kategoriia3',
                'parentId': 0,
                'pos': 1,
                'isDisabled': false,
                'childes': null
            }
        ]
    };
    private detachClick: () => void;
    isActive: boolean = false;
    catTreeHTML: string = '';
    @ViewChild('nav', {static: true}) nav: ElementRef;
    @ViewChild('button', {static: true}) button: ElementRef;

    constructor(
        private renderer: Renderer2,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.catTreeHTML = this.walkOnCats(this.catTree.childes, '/cat');
    }

    ngOnDestroy(): void {
        this.toggleEventOnLink(false);
    }

    ngAfterViewInit() {
        this.toggleEventOnLink(true);
    }

    toggleEventOnLink(isAdd: boolean): void {
        if (!this.links.length) {
            const elements = this.nav.nativeElement.querySelectorAll('.nav_tree a');
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

            result += '<li><a class="text-eclipse' + sxHasChilds + '"' + routerLink + '>' + cat.name + '</a>';

            if (hasChildes) {
                result += this.walkOnCats(cat.childes, urlNew);
            }

            result += '</li>';
        }

        result += '</ul>';

        return result;
    }
}
