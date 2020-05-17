import {CatInterface, CatTreeInterface, CatWithDeepInterface} from './interfaces/response/cat';
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
                if (obj[key]) { // файлов может и не быть
                    for (let i = 0; i < obj[key].length; i++) {
                        formData.append(key, obj[key][i]);
                    }
                }
                continue;
            }
            formData.append(key, obj[key]);
        }

        return formData;
    }

    static getAncestors(listCatTree: CatTreeInterface[], findCatId: number): CatInterface[] {
        let list: CatInterface[] = [];

        for (let i = 0; i < listCatTree.length; i++) {
            const cat = listCatTree[i];

            if (cat.catId === findCatId) {
                const a = Object.assign({}, cat);
                delete a.childes;
                list.unshift(cat);

                return list;
            }
            if (cat.childes && cat.childes.length) {
                let res = this.getAncestors(cat.childes, findCatId);

                if (res.length) {
                    const a = Object.assign({}, cat);
                    delete a.childes;

                    list.unshift(...res);
                    list.unshift(a);

                    return list;
                }
            }
        }

        return list;
    }

    static getDescendants(listCatTree: CatTreeInterface[], findCatId: number, receiver: CatInterface[], deep: number): boolean {
        for (let i = 0; i < listCatTree.length; i++) {
            const cat = listCatTree[i];

            if (cat.catId === findCatId) {
                const a = Object.assign({}, cat);
                delete a.childes;

                receiver.unshift(a);
                return true;
            }
            if (cat.childes && cat.childes.length) {
                let res = this.getDescendants(cat.childes, findCatId, receiver, deep + 1);

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

        if (res && res.length > 1) {
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
        console.log('handleErr:', err);
    }

    static masonry(parent: HTMLBaseElement, selectorChildes: string, margin: number = 10): boolean {
        const widthParent: number = parent.offsetWidth;
        let list: HTMLBaseElement[] = Array.from(parent.querySelectorAll(selectorChildes));
        let aPasted: HTMLBaseElement[] = [];
        let aLook: HTMLBaseElement[] = [];
        let saveX: number = 0;
        let saveY: number = 0;

        if (!list.length) {
            return false;
        }

        let widthChild: number = list[0].offsetWidth + margin;

        for (let i = 0, j = 0, modeCheckHeight = false; i < list.length; i++) {
            const el: HTMLBaseElement = list[i];
            el.style.position = 'absolute';

            // если наткнулись уже на правый край
            if ((widthChild * (j + 1)) > widthParent) {
                j = 0;

                if (!modeCheckHeight) {
                    modeCheckHeight = true;
                }
            }

            if (modeCheckHeight) {
                let finedIndex: number = 0;
                let tmpY = 0;
                for (let k = 0; k < aLook.length; k++) {
                    const el2: HTMLBaseElement = aLook[k];
                    const top: number = parseInt(el2.style.top, 10) + el2.offsetHeight + margin;

                    if (!k) {
                        tmpY = top;
                        continue;
                    }
                    if (top < tmpY) {
                        tmpY = top;
                        finedIndex = k;
                    }
                }

                saveX = parseInt(aLook[finedIndex].style.left, 10);
                saveY = tmpY;
                aLook[finedIndex] = el;

            } else {
                saveX = widthChild * j;
                aLook.push(el);
            }

            el.style.left = saveX + 'px';
            el.style.top = saveY + 'px';

            j++;
            aPasted.push(el);
        }

        // выставим в конце высоту родительсткого блока
        saveY = 0;
        for (let i = 0; i < aPasted.length; i++) {
            const el: HTMLBaseElement = aPasted[i];
            const top: number = parseInt(el.style.top, 10) + el.offsetHeight;

            if (saveY < top) {
                saveY = top;
            }
        }
        parent.style.height = saveY + 'px';

        return true;
    }

    static getCatTreeAsOneLevel(catTree: CatTreeInterface): CatWithDeepInterface[] {
        let cats: CatWithDeepInterface[] = [];

        this.walkGetCatTreeAsOneLevel(catTree.childes, 0, cats);

        return cats;
    }

    static walkGetCatTreeAsOneLevel(catTree: CatTreeInterface[], deep: number, receiver: CatWithDeepInterface[]): void {
        catTree.forEach(x => {
            receiver.push({
                catId: x.catId,
                name: x.name,
                slug: x.slug,
                parentId: x.parentId,
                pos: x.pos,
                isDisabled: x.isDisabled,
                priceAlias: x.priceAlias,
                priceSuffix: x.priceSuffix,
                titleHelp: x.titleHelp,
                titleComment: x.titleComment,
                isAutogenerateTitle: x.isAutogenerateTitle,
                deep: deep,
            });

            if (x.childes && x.childes.length) {
                this.walkGetCatTreeAsOneLevel(x.childes, deep + 1, receiver);
            }
        });
    }

    static isLeaf(catsTree: CatTreeInterface[], catId: number): number {
        let x: number = -1;

        for (let i = 0; i < catsTree.length; i++) {
            const el = catsTree[i];

            if (el.catId === catId) {
                if (el.childes && el.childes.length) {
                    return 0;
                }

                return 1;
            }
            if (el.childes && el.childes.length) {
                let tmp = this.isLeaf(el.childes, catId);

                if (tmp > -1) {
                    return tmp;
                }
            }
        }

        return x;
    }

    // static addImage(): void {}
    //
    // static removeImage(): void {}
}
