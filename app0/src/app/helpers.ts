import {CatInterface, CatTreeInterface, CatWithDeepInterface} from './interfaces/response/cat';
import {BreadcrumbsInterface} from './interfaces/breadcrumbs';
import {UrlSegment} from '@angular/router';
import {FormGroup} from '@angular/forms';

export class Helpers {
    static getNewFormData(obj: object): FormData {
        const form = new FormData();

        // выставляем одномерно
        Object.keys(obj).forEach(key => {
            if (key === 'files') {
                if (obj[key]) { // файлов может и не быть
                    for (const el of obj[key]) {
                        form.append(key, el);
                    }
                    // for (let i = 0; i < obj[key].length; i++) {
                    //     form.append(key, obj[key][i]);
                    // }
                }

                return true;
            }

            form.append(key, obj[key]);
        });

        return form;
    }

    static getAncestors(listCatTree: CatTreeInterface[], findCatID: number): CatInterface[] {
        const list: CatInterface[] = [];

        for (const cat of listCatTree) {
            if (cat.catID === findCatID) {
                const a = Object.assign({}, cat);
                delete a.childes;
                list.unshift(cat);

                return list;
            }
            if (cat.childes && cat.childes.length) {
                const res = this.getAncestors(cat.childes, findCatID);

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

    static getDescendants(listCatTree: CatTreeInterface[], findCatID: number, receiver: CatInterface[], deep: number): boolean {
        for (const cat of listCatTree) {
            if (cat.catID === findCatID) {
                const a = Object.assign({}, cat);
                delete a.childes;

                receiver.unshift(a);
                return true;
            }
            if (cat.childes && cat.childes.length) {
                const res = this.getDescendants(cat.childes, findCatID, receiver, deep + 1);

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
        const bcItems: BreadcrumbsInterface[] = [];
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

    static findCatFromSlugs(catsTree: CatTreeInterface[], slugs: UrlSegment[]): CatTreeInterface {
        const cat: CatTreeInterface = null;

        if (!slugs.length) {
            return cat;
        }

        for (const tmpCat of catsTree) {
            if (tmpCat.slug === slugs[0].path) {
                if (tmpCat.slug === slugs[0].path && slugs.length === 1) {
                    return tmpCat;
                }
                if (tmpCat.slug === slugs[0].path && slugs.length > 1 && tmpCat.childes && tmpCat.childes.length) {
                    return this.findCatFromSlugs(tmpCat.childes, slugs.slice(1));
                }
            }
        }

        return cat;
    }

    static masonry(parent: HTMLBaseElement, selectorChildes: string, margin: number = 10): boolean {
        const widthParent: number = parent.offsetWidth;
        const list: HTMLBaseElement[] = Array.from(parent.querySelectorAll(selectorChildes));
        const aPasted: HTMLBaseElement[] = [];
        const aLook: HTMLBaseElement[] = [];
        let saveX = 0;
        let saveY = 0;

        if (!list.length) {
            return false;
        }

        const widthChild: number = list[0].offsetWidth + margin;

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
                let finedIndex = 0;
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
        for (const el of aPasted) {
            // const el: HTMLBaseElement = aPasted[i];
            const top: number = parseInt(el.style.top, 10) + el.offsetHeight;

            if (saveY < top) {
                saveY = top;
            }
        }
        parent.style.height = saveY + 'px';

        return true;
    }

    static getCatTreeAsOneLevel(catTree: CatTreeInterface): CatWithDeepInterface[] {
        const cats: CatWithDeepInterface[] = [];
        this.walkGetCatTreeAsOneLevel(catTree.childes, 0, cats);
        return cats;
    }

    static walkGetCatTreeAsOneLevel(catTree: CatTreeInterface[], deep: number, receiver: CatWithDeepInterface[]): void {
        catTree.forEach(x => {
            receiver.push({
                catID: x.catID,
                name: x.name,
                slug: x.slug,
                parentID: x.parentID,
                pos: x.pos,
                isDisabled: x.isDisabled,
                priceAlias: x.priceAlias,
                priceSuffix: x.priceSuffix,
                titleHelp: x.titleHelp,
                titleComment: x.titleComment,
                isAutogenerateTitle: x.isAutogenerateTitle,
                deep,
            });

            if (x.childes && x.childes.length) {
                this.walkGetCatTreeAsOneLevel(x.childes, deep + 1, receiver);
            }
        });
    }

    static isLeaf(catsTree: CatTreeInterface[], catID: number): number {
        for (const el of catsTree) {
            if (el.catID === catID) {
                if (el.childes && el.childes.length) {
                    return 0;
                }

                return 1;
            }
            if (el.childes && el.childes.length) {
                const tmp = this.isLeaf(el.childes, catID);

                if (tmp > -1) {
                    return tmp;
                }
            }
        }

        return -1;
    }

    static addScript(url: string): void {
        const script = document.createElement('script');
        script.src = url;
        script.async = false; // чтобы гарантировать порядок
        document.head.appendChild(script);
    }

    static addPhoto(target: HTMLFormElement, form: FormGroup): void {
        const cFiles = form.get('files');
        const totalFiles = target.files.length;

        if (totalFiles) {
            form.markAsDirty(); // на стр. профиля (ава) нужна
            cFiles.setValue(target.files);

        } else {
            cFiles.setValue(''); // null
        }
    }

    static youTubeLink(str: string): string {
        const parser = document.createElement('a');
        let result = '';
        let hash = '';

        parser.href = str;

        if (parser.search) {
            const tmpStr: string[] = parser.search.substr(1).split('&');
            hash = tmpStr[0];

            if (hash.indexOf('=') !== -1) {
                const lastIndex: number = hash.lastIndexOf('=');
                hash = hash.substr(lastIndex + 1);
            }

        } else if (parser.pathname) {
            const tmpStr: string[] = parser.pathname.split('/');
            hash = tmpStr[1];
        }

        if (hash) {
            result = 'https://www.youtube.com/embed/' + hash;
        }

        return result;
    }

    static serializeObj(obj: object): string {
        const aQuery = [];

        for (const p in obj) {
            if (obj.hasOwnProperty(p)) {
                aQuery.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }

        return aQuery.join('&');
    }

    static isSocialEmail(email: string): boolean {
        let result = false;
        const aDomains: string[] = ['@vk.com', '@ok.ru', '@facebook.com', '@google.com'];

        for (const el of aDomains) {
            if (email.endsWith(el)) {
                result = true;
                break;
            }
        }

        return result;
    }

    static isArrayMdnOfficial(objToCheck) {
        return Object.prototype.toString.call(objToCheck) === '[object Array]';
    }

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
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
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
}
