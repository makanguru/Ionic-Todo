import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage  {

  public newTodo: string;
  
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }


  onSaveTodo(){
    if( this.newTodo ) {
      const todo = {
        subject: this.newTodo,
        //ids: '' + this.data.getRandomInt(100000000000000000000),
        ids: '',
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
