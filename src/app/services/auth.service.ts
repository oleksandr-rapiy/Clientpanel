import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '../models/User'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(user: User ) {
    return new Promise((resolve, rejects) => {
      this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(userData => {resolve(userData)})
      .catch(error => rejects(error))
    })
  }

  getAuth() {
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  register(user: User) {
    return new Promise((resolve, rejects) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userData => {resolve(userData)})
      .catch(error => rejects(error))
    })
  }
}
