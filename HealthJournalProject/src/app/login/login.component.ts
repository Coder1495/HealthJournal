import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {UserService} from '../user.service';

import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    email: any = '';
    password: string = null;
    logo = '../../../assets/logo.png';

    constructor(public afAuth: AngularFireAuth,
                public afStore: AngularFirestore,
                public alert: AlertController,
                public user: UserService,
                public auth: AuthService,
                public router: Router) {
    }

    ngOnInit() {
    }

    async login() {
        const {email, password} = this;
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.dir(error);
            this.showAlert('Error', error.message);
            // tslint:disable-next-line: triple-equals
            if (error.code === 'auth/user-not-found') {
                console.log('User not found');
                this.showAlert('Error', error.message);
            }
        }
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
