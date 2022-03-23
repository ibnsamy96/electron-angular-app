import { Component } from '@angular/core';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks: string[] = [];
  newEntry: string = '';

  constructor(private readonly _ipc: IpcService) {
    this._ipc.on(
      'db:task-added',
      (event: Electron.IpcMessageEvent, tasks: string[]) => {
        console.log('db:task-added');
        this.tasks = [...tasks];
        console.log(this.tasks);
      }
    );
  }

  addTask(): void {
    this._ipc.send('db:add-task', this.newEntry);
    this.newEntry = '';
  }
}
