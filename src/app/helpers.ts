import {CatInterface, CatTreeInterface} from './interfaces/response/cat';
import {BreadcrumbsInterface} from './interfaces/breadcrumbs';
import {UrlSegment} from '@angular/router';

export class Helpers {
    static rand(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getNumberOfWeek(): number {
        const today: any = new Date();
        const firstDayOfYear: any = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    static getUniqHash(idStrLen: number = 32, prefix: string = ''): string {
        let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36);

        idStr += (new Date()).getTime().toString(36);

        do {
            idStr += (Math.floor((Math.random() * 35))).toString(36);
        } while (idStr.length < idStrLen);

        return prefix + idStr;
    }

    static getCurDate(): string {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const res = yyyy + '-' + mm + '-' + dd;

        return res;
    }

    static animateScrollTo(selectorEl): void {
        const personalFeed = document.querySelector(selectorEl);
        const offsetTop = personalFeed.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    }

    static dateToHTML(serverDate: string): string {
        return new Date(serverDate).toISOString().split('T')[0];
    }

    static getNewFormData(obj: Object): FormData {
        const formData = new FormData();
        for (const key in obj) {
            if (key === 'files') {
                for (let i = 0; i < obj[key].length; i++) {
                    formData.append(key, obj[key][i]);
                }
                continue;
            }
            formData.append(key, obj[key]);
        }

        return formData;
    }

    static getDestidantCatTree(listCatTree: CatTreeInterface[], findCatId: number, receiver: CatInterface[], deep: number): boolean {
        for (let i = 0; i < listCatTree.length; i++) {
            const cat = listCatTree[i];

            if (cat.catId === findCatId) {
                const a = Object.assign({}, cat);
                delete a.childes;

                receiver.unshift(a);
                return true;
            }
            if (cat.childes && cat.childes.length) {
                let res = this.getDestidantCatTree(cat.childes, findCatId, receiver, deep + 1);

                if (res) {
                    const a = Object.assign({}, cat);
                    delete a.childes;

                    receiver.unshift(a);

                    if (!deep) {
                        // тут конец
                    }

                    return res;
                }
            }
        }

        return false;
    }

    static buildBCFromCats(cats: CatInterface[]): BreadcrumbsInterface[] {
        let bcItems: BreadcrumbsInterface[] = [];
        let urlSave = '/';

        urlSave += 'cat';
        bcItems.push({
            name: 'Каталог',
            url: urlSave,
        });

        Object.keys(cats).forEach(key => {
            const cat = cats[key];

            urlSave += '/' + cat.slug;
            bcItems.push({
                name: cat.name,
                url: urlSave,
            });
        });

        return bcItems;
    }

    static getAdIdFromUrl(): number {
        let result = 0;
        const regexp = /_(\d+)$/;
        const a = document.createElement('a');
        a.href = window.location.href;

        let res = a.pathname.match(regexp);

        if (res && res.length && res.length > 1) {
            const adId = parseInt(res[1], 10);

            if (adId) {
                result = adId;
            }
        }

        return result;
    }

    static findCatIdFromSlugs(catsTree: CatTreeInterface[], slugs: UrlSegment[]): number {
        let catId = 0;

        if (!slugs.length) {
            return catId;
        }

        for (let i = 0; i < catsTree.length; i++) {
            const cat = catsTree[i];

            // нашли то что искали
            if (cat.slug === slugs[0].path) {
                if (cat.slug === slugs[0].path && slugs.length === 1) {
                    return cat.catId;
                }
                if (cat.slug === slugs[0].path && slugs.length > 1 && cat.childes && cat.childes.length) {
                    return this.findCatIdFromSlugs(cat.childes, slugs.slice(1));
                }
            }
        }

        return catId;
    }

    static handleErr(err: any): void {
        console.log(err);
    }
}
