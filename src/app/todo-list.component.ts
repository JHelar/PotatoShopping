import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'
import * as firebase from 'firebase/app';

import { ToDo } from './todo';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
    todosRef: AngularFireList<ToDo>;
    todos: Observable<ToDo[]>;

    titleVal: string = '';

    constructor(
        private afdb: AngularFireDatabase,
        private afauth: AngularFireAuth
    ){
        this.todosRef = afdb.list('/todos');
        this.todos = this.todosRef.valueChanges().map((todo:any) => {
            todo.canedit = todo.by === this.afauth.auth.currentUser.displayName;
            return todo;
        });
    }

    Create() {
        let today = new Date();
        let item: ToDo = {
            by: this.afauth.auth.currentUser.displayName,
            created: today.toISOString(),
            updated: today.toISOString(),
            done: false,
            doneby: '',
            title: this.titleVal,
            canedit: true,
            key: ''
        };
        this.todosRef.push(item).then((fb_item: any) => {
            item.key = fb_item.key;
            this.todosRef.update(item.key, item);
        });
        this.titleVal = '';
    }

    Remove(item: ToDo){
        this.todosRef.remove(item.key);
    }
}