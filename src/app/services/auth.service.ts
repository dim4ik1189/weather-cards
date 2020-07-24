import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }

  public signIn(email, password): Promise<any>  {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          this.userAuthData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
          };
          localStorage.setItem('user', JSON.stringify(this.userAuthData));
          // JSON.parse(localStorage.getItem('user'));

          this.router.navigate(['dashboard']);

        }

        // this.setUserData(user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  private setUserData(user): void  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    userRef.set(userData, {
      merge: true,
    });
  }

  public signOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
