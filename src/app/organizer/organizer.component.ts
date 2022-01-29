import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from '../common/date.service';
import { TaskService, Task } from '../common/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  tasks: Task[] = [];

  constructor(public dateService: DateService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.getAll(value))
    ).subscribe(tasks => this.tasks = tasks)
  }

  submit() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }
    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    })
  }
  
  removeTask(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    })
  }
}
