import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService} from '../services/data.service';
import { Todo } from '../todo.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  todos: Todo[];
  tmp: Todo = {subject: 'ionViewWillEnter', id: 1, done: true};
  isLoading = false;
  timerId: any;

  constructor(private data: DataService) {}



  ngOnInit(): void {
    this.timerId = setInterval(() => this.getTodos(), 2000);
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }


  getTodosAs(): Todo[] {
    return this.todos;
  }


  getTodos() {
    this.isLoading = true;
    this.data.fetchTodos().subscribe((res) => {
      this.isLoading = false;
      this.todos = res;
    });

  }

  ionViewWillEnter() {
    this.getTodos();
  }

  ngOnDestroy() {  
    clearInterval(this.timerId)
  }


}
