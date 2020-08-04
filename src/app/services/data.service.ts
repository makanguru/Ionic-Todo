import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import {  map, catchError } from 'rxjs/operators';

import { Todo } from '../todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public todos: Todo[] = [ ];

  constructor( private http: HttpClient ) { }

  public getTodos(): Todo[] {
    return this.todos;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  public addTodo(todo: Todo)  {

      return this.http.post('https://ionic-todo-22a1f.firebaseio.com/iontodo.json', todo )
      .pipe(
        catchError(this.handleError)
      )
  }
  
  public fetchTodos() {
    return this.http.get('https://ionic-todo-22a1f.firebaseio.com/iontodo.json')
      .pipe(
        map(  resDat => {
          const todos = [];
          for (const key in resDat) {
            if (Object.prototype.hasOwnProperty.call(resDat, key)) {
              todos.push(resDat[key]);
              //console.log("Get todos", resDat[key]);
            }
          }
          return todos;          
        })
      );
  }

  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
