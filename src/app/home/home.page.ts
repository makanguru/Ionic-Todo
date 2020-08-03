import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService} from '../services/data.service';
import { Todo } from '../todo.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  todos: Todo[];
  tmp: Todo = {
    subject: 'ionViewWillEnter',
    id: 1,
    done: true
  }
  isLoading = false;
  private todoSub: Subscription;

  constructor(private data: DataService) {}

  
  ngOnInit(): void {
//    this.todoSub = this.placesService.places.subscribe(places => {
//      this.offers = places;
//    });
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  //getTodos(): Todo[] {
  //return this.data.getTodos();

  getTodosAs(): Todo[] {
    return this.todos;
  }


  getTodos(tt: Todo) {
    this.isLoading = true;
    this.data.fetchTodos().subscribe((res) => {
      this.isLoading = false;
      this.todos = res;
      this.todos.push(tt);
    });

  }

  ionViewWillEnter() {
    this.getTodos(this.tmp);
  }




}
