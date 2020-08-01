import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  subject: string;
  id: number;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public todos: Todo[] = [
    {
      subject: 'New event: Trip to Vegas',
      id: 0,
      done: true
    },
    {
      subject: 'Long time no chat',
      id: 1,
      done: false
    },
    {
      subject: 'Report Results',
      id: 2,
      done: false
    },
    {
      subject: 'The situation',
      id: 3,
      done: false
    },
    {
      subject: 'Updated invitation: Swim lessons',
      id: 4,
      done: true
    },
    {
      subject: 'Last minute ask',
      id: 5,
      done: false
    },
    {
      subject: 'Family Calendar - Version 1',
      id: 6,
      done: false
    },
    {
      subject: 'Placeholder Headhots',
      id: 7,
      done: true
    }
  ];

  constructor( private http: HttpClient ) { }

  public getTodos(): Todo[] {
    return this.todos;
  }

  public addTodo(todo: Todo)  {
    this.todos.push(todo);
  }
  
  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  

}
