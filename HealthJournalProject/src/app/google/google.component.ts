import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {LoadingController, Platform} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-google',
    templateUrl: './google.component.html',
    styleUrls: ['./google.component.scss'],
})
export class GoogleComponent implements OnInit {
    loading: any;

    constructor(
        private router: Router,
        private platform: Platform,
        public loadingController: LoadingController,
        private fireAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        private auth: AuthService
    ) {
    }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: 'Connecting ...'
        });
    }

    async presentLoading(loading) {
        await loading.present();
    }

    async googleLogin() {
        if (this.platform.is('cordova')) {
            this.cordovaLogin();
        } else {
            this.webLogin();
        }
    }

    async cordovaLogin() {
        console.log('missing cordova');
    }

    async webLogin() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const credential = await this.fireAuth.auth.signInWithPopup(provider);
            if (credential.user) {
                this.updateUserData(credential.user);
            }
            const navExtras: NavigationExtras = {
                queryParams: {uid: credential.user.uid}
            };
            let patientData;
            let userData = this.afStore.collection<any>('users').doc(credential.user.uid);
            await userData.valueChanges().subscribe(data => {
                patientData = data['patient'];
            }, (err) => {
                console.log(err);
            }, () => {
                if (patientData) {
                    this.router.navigate(['/home'], navExtras);
                } else {
                    this.router.navigate(['/profile'], navExtras);
                }
                this.loading.dismiss();
            });

        } catch (err) {
            console.log(err);
        }
    }

    private updateUserData({uid, email, displayName, photoURL}) {
        const userRef: AngularFirestoreDocument = this.afStore.doc(`users/${uid}`);
        const data = {
            uid,
            email,
            displayName,
            photoURL
        };
        return userRef.set(data, {merge: true});
    }

    onLoginError(err) {
        console.log(err);
    }
}
