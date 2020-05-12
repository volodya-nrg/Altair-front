import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform {
    transform(value: unknown): string {
        let res = JSON.stringify(value, null, '    ');
        return res;
    }
}
