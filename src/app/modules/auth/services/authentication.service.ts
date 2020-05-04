import { Injectable, NgZone } from '@angular/core';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { User } from  'firebase';

export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedInAndVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  // Sign in with email/password
  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  // Sign in with Google
  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    })
  }








  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }



















  //
  //
  //
  // user: User;
  //
  // constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
  //
  //   this.afAuth.authState.subscribe(user => {
  //     if (user){
  //       this.user = user;
  //       localStorage.setItem('user', JSON.stringify(this.user));
  //     } else {
  //       localStorage.setItem('user', null);
  //     }
  //   })
  //
  //  }
  //
  //  async login(email: string, password: string) {
  //      var result = await this.afAuth.signInWithEmailAndPassword(email, password)
  //      this.router.navigate(['admin/list']);
  //  }
  //
  //  async register(email: string, password: string) {
  //      var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  //      // await this.sendEmailVerification();
  //  }
  //
  //  // async sendEmailVerification() {
  //  //     await this.afAuth.currentUser.sendEmailVerification();
  //  //     this.router.navigate(['admin/verify-email']);
  //  // }
  //
  //  async sendPasswordResetEmail(passwordResetEmail: string) {
  //     return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  //  }
  //
  //  async logout(){
  //      await this.afAuth.signOut();
  //      localStorage.removeItem('user');
  //      this.router.navigate(['admin/login']);
  //  }
  //
  //  get isLoggedIn(): boolean {
  //      const  user  =  JSON.parse(localStorage.getItem('user'));
  //      return  user  !==  null;
  //  }
  //
  //  async  loginWithGoogle(){
  //      await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //      this.router.navigate(['admin/list']);
  //  }
}
