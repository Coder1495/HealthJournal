import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AlertController, NavController} from '@ionic/angular';
import {UserService} from 'src/app/user.service';

@Component({
    selector: 'app-document',
    templateUrl: './document.page.html',
    styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
    summary: string = '';


    constructor(
        public Uauth: AuthService,
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        private afdb: AngularFireDatabase,
        private alert: AlertController,
        public navCtrl: NavController,
        private user: UserService,
        private router: Router) {
    }

    ngOnInit() {
    }

    backbtn() {
        this.router.navigate(['/tabs/questions']);
    }

    async submit() {
        const summary = this.summary;
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = date.getFullYear();
        const today = yyyy + '-' + mm + '-' + dd;

        const res = this.afStore.doc(`users/${this.Uauth.cUid}/survey/${today}`);

        res.set({summary: {summary}}, {merge: true});
        this.router.navigate(['/tabs/chat']);
    }
}
