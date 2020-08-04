import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from '../services/data.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {

  public newTodo: string;
  
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  onSaveTodo(){
    if( this.newTodo ) {
      const todo = {
        subject: this.newTodo,
        id: this.data.getRandomInt(100000000000000000000),
        done: false
      };

      this.data.addTodo(todo).subscribe();
      this.newTodo = '';
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }




}
