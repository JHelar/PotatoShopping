import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: Observable<firebase.User>;
  
  constructor(private afauth: AngularFireAuth){
      this.user = afauth.authState;
  }

  logout() {
      this.afauth.auth.signOut();
  }
}
