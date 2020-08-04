import { Component, OnInit, Input } from '@angular/core';

import { DataService} from '../services/data.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private data: DataService) { }

  ngOnInit() {}

  checkDone() {
    this.data.updateTodo(this.todo).subscribe(resDat => console.log( " After editing " ));
  }



  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
