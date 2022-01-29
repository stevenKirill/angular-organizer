import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface Task {
    title: string
    id?: string
    date?: string
}

interface CreateRes {
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    static url = 'https://angular-practise-organizer-default-rtdb.firebaseio.com/tasks';
    constructor(private http: HttpClient ) {
    }

    create(task: Task): Observable<Task> {
        return this.http
        .post<CreateRes>(`${TaskService.url}/${task.date}.json`,task)
        .pipe(map(res => {
            return {...task, id: res.name}
        }))
    }

    getAll(date: moment.Moment): Observable<Task[]> {
        return this.http.get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
        .pipe(map(tasks => {
            if(!tasks) return []
            return Object.keys(tasks).map((key) => ({...tasks[key], id: key }))
        }))
    }
}