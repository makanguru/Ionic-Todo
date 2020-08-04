import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import {  map, catchError, switchMap, take, tap } from 'rxjs/operators';
import { Todo } from '../todo.model';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private streamTodos = new BehaviorSubject<Todo[]>([]);
  get todos() {
    return this.streamTodos.asObservable();
  }

  
  mainURL = environment.mainURL;
  postgetURL = this.mainURL + '.json';

  constructor( private http: HttpClient ) { }

  public getTodos(): Todo[] {
    return [];
    // return this.todos;
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
      let generatedId: string;
      const newTodo = todo;
      return this.http
        .post<{ name: string }>(
          this.postgetURL,
          {
            ...newTodo// ,
            // id: null
          }
        )
        .pipe(
          switchMap(resData => {
            generatedId = resData.name;
            return this.todos;
          }),
          take(1),
          tap(todos => {
            // console.log()
            newTodo.ids = generatedId;
            this.streamTodos.next(todos.concat(newTodo));
          }),
         catchError(this.handleError),

        )
  }
  
  public fetchTodos() {
    return this.http.get(this.postgetURL)
      .pipe(
        catchError(this.handleError),
        map(  resDat => {
          const todos = [];
          for (const key in resDat) {
            if (Object.prototype.hasOwnProperty.call(resDat, key)) {
              const objTodo = resDat[key];
              objTodo.ids = key;
              todos.push(objTodo);
              // console.log("Get todos", resDat[key]);
            }
          }
          return todos;
        }),

      );
  }

  public updateTodo(todo: Todo) {
    const putURL = `https://ionic-todo-22a1f.firebaseio.com/iontodo/${todo.ids}.json`;

    console.log(putURL, todo)

    return this.http.put(putURL, {...todo}  )
    .pipe(
      catchError(this.handleError)
    );

  }

  public getRandomInt(max) {
    const retIds = '' + (Math.floor(Math.random() * Math.floor(max)));
    return retIds;
  }

}
