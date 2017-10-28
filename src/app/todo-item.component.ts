import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ToDo } from './todo';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
    @Input() item: ToDo;
    @Output() onRemove: EventEmitter<ToDo> = new EventEmitter();
    
    constructor(
        private afdb: AngularFireDatabase,
        private afauth: AngularFireAuth
    ){}

    Update(){
        this.item.updated = (new Date()).toISOString()
        this.item.doneby = this.afauth.auth.currentUser.displayName;
        this.afdb.list('/todos').update(this.item.key, this.item);
    }

    Remove(){
        this.onRemove.emit(this.item);
    }
}