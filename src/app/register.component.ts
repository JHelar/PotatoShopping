import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    success = false;
    submitted = false;
    callout: any = {
        error: false,
        message: ''
    }
    model = {
        email: '', 
        password: '',
        confpassword: '',
        displayname: ''
    }
    constructor(
        private afauth: AngularFireAuth,
        private router: Router
    ){}

    onSubmit() {
        this.submitted = true;
        this.afauth.auth.createUserWithEmailAndPassword(
            this.model.email,
            this.model.password
        )
        .then(() => {
            this.afauth.auth.currentUser.updateProfile({
                displayName: this.model.displayname,
                photoURL: ''
            }).then(() => this.router.navigate(['']));
        })
        .catch(e => {
            console.log('error', e);
            this.callout.error = true;
            this.callout.message = e.message;
            this.submitted = false;
            this.success = false
        })
    }
}