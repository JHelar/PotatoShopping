import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    user: Observable<firebase.User>;

    constructor(private afauth: AngularFireAuth){
        this.user = afauth.authState;
    }

    logout() {
        this.afauth.auth.signOut();
    }
}