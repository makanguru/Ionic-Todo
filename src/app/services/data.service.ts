import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { tap, take, switchMap } from 'rxjs/operators';

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

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }



  public addTodo(todo: Todo)  {

    //console.log(todo);

      return this.http.post('https://ionic-todo-22a1f.firebaseio.com/iontodo.json', todo )
      .pipe(
        tap(  resDat => {
          console.log(resDat)
        })
        ).subscribe((res) => {
          console.log("Adding todo name=", res)
          this.todos.push(todo);
        });
  }
  
  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  

}
