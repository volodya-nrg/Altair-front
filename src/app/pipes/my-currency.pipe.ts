import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {
    transform(value: number): string {
        if (!value) {
            return;
        }

        const s = value.toString();
        let res = s.replace(/(?<=\d)(?=(?:\d\d\d)+$)/g, ' ');

        return res;
    }
}
