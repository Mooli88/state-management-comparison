import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }

        return of(null);
      })
    );
  }

  loginWith(provider: string = 'google') {
    let authProvider;
    switch (provider) {
      case 'github': {
        authProvider = new auth.GithubAuthProvider();
        break;
      }
      case 'twitter': {
        authProvider = new auth.TwitterAuthProvider();
        break;
      }
      case 'facebook': {
        authProvider = new auth.FacebookAuthProvider();
        break;
      }

      default: {
        authProvider = new auth.GoogleAuthProvider();
      }
    }

    return this.oAuthLogin(authProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    const { uid, email, displayName, photoURL } = user;

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    return userRef.set({ uid, email, displayName, photoURL });
  }
}
