import {Injectable} from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())

    changeMonth(n: number) {
        const val = this.date.value.add(n,'month');
        this.date.next(val);
    }

    changeDate(date: moment.Moment) {
        const value = this.date.value.set({
            date: date.date(),
            month: date.month()
        })
        this.date.next(value)
    }
}