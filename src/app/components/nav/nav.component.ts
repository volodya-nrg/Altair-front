import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit, AfterViewInit {
    isActive = false;
    detachClick: () => void;
    @ViewChild('nav', {static: true}) nav: ElementRef;

    constructor(
        private renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    toggleMenu(): void {
        this.isActive = !this.isActive;
        this.isActive ? this.openMenu() : this.hideMenu();
    }

    openMenu(): void {
        this.isActive = true;
        this.detachClick = this.renderer.listen('document', 'click', (e) => {
            let inZone = false;

            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i] === this.nav.nativeElement) {
                    inZone = true;
                    break;
                }
            }

            if (!inZone) {
                this.hideMenu();
            }
        });
    }

    hideMenu(): void {
        this.isActive = false;
        this.detachClick();
    }

    onClickA({target}): void {
        target.classList.toggle('sx-active');
    }
}
