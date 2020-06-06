import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavigationExtras, Router} from '@angular/router';

import {AlertController} from '@ionic/angular';

import {UserService} from '../user.service';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    logo = '../../assets/logo.png';

    email?: string;
    password?: string;
    repassword: string;

    constructor(
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
        public alert: AlertController,
        public user: UserService,
        public router: Router
    ) {
    }

    async register() {
        const {email, password, repassword} = this;
        if (password !== repassword) {
            this.router.navigate(['/register']);
            this.showAlert('Error', 'Password do not match');
            return console.error('Password do not match');
        }
        try {
            const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
            if (credential.user) {
                this.user.setUser({
                    uid: credential.user.uid,
                    email,
                    displayName: email.split('@')[0]
                });
                console.log(credential.user.uid);

                const navExtras: NavigationExtras = {
                    queryParams: {uid: credential.user.uid}
                };
                this.router.navigate(['/profile'], navExtras);
                this.afAuth.auth.currentUser.sendEmailVerification();
                console.log('We have sent you an email verification');
                this.showAlert('Verification', 'We have sent you an email verification');
            }
        } catch (error) {
            console.dir(error);
            this.showAlert('Error', error.message);
            this.router.navigate(['/register']);
        }
    }

    ngOnInit() {
    }

    async showAlert(header: string, message: string) {
        const alert = this.alert.create({
            header,
            message,
            buttons: ['OK']
        });
        await (await alert).present();
    }
}
