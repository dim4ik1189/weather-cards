import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthData: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }

  public signIn(email, password): void  {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          this.userAuthData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
          };

          localStorage.setItem('user', JSON.stringify(this.userAuthData));

          this.router.navigate(['dashboard']);
        }

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public signOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
