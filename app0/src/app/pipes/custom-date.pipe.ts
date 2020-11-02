import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: string, opt: string): string {
        if (!value) {
            return;
        }

        if (opt !== 'full') {
            return new Date(value).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }

        const a = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'string',
            minute: 'string',
        };
        a.hour = '2-digit';
        a.minute = '2-digit';

        return new Date(value).toLocaleString('ru', a);
    }
}
