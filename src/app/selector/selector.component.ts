import { Component, OnInit } from '@angular/core';
import { DateService } from '../common/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(public dateService: DateService) { }

  // get date() {
  //   return this.dateService.date
  // }

  next() {
    this.dateService.changeMonth(1)
  }
  prev() {
    this.dateService.changeMonth(-1)
  }

  ngOnInit(): void {
      
  }
}
