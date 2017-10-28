import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    success = false;
    submitted = false;
    callout = {
        error: false,
        message: ''
    }
    model = {
        email: '',
        password: ''
    }

    constructor(
        private afauth: AngularFireAuth,
        private router: Router
    ){
    }

    login() {
        this.submitted = true;
        this.afauth.auth.signInWithEmailAndPassword(
            this.model.email, 
            this.model.password)
        .then(() => this.router.navigate(['']))
        .catch(e => {
            this.success = false;
            this.callout.error = true;
            this.callout.message = e.message;
        });
    }
}