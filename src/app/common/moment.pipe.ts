import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment',
    pure: false,
})
export class MomemtPipe implements PipeTransform {
    transform(m: moment.Moment, format: string = 'MMM YYYY'): string {
        return m.format(format)   
    }
}