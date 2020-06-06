import {Injectable} from '@angular/core';
import {Userelement} from './user.service';

import {Observable} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({providedIn: 'root'})
export class AuthService {

    // Observable provide support for passing messages
    //  between publishers and subscribers in your application.
    user$: Observable<Userelement>;
    uInfo: Userelement = null;

    constructor(
        private afAuth: AngularFireAuth) {

        // User authentication function
        this.user$ = this.afAuth.authState;
        this.user$.subscribe((user) => {
            if (user) {
                this.uInfo = user;
            } else {
                this.uInfo = null;
            }
        });

        // check user email varified or not
        this.afAuth.authState.subscribe(user => {
            if (user) {
                setInterval(() => {
                    //      this.verifiedEmail = this.afAuth.auth.currentUser.emailVerified;
                }, 1000);
            }
        });
    }

    // authenticated or not
    get authenticated(): boolean {
        return this.uInfo !== null;
    }

    // to get user data
    get cUid(): string {
        return this.authenticated ? this.uInfo.uid : null;
    }

}
