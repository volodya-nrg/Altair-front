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
}
