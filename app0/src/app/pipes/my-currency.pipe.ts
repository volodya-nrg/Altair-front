import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {
    transform(value: number): string {
        if (!value) {
            return;
        }

        let s = value.toString();
        s = s.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

        return s;
    }
}
