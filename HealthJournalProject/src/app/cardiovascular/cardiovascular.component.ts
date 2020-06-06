import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';

import {AuthService} from 'src/app/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-cardiovascular',
    templateUrl: './cardiovascular.component.html',
    styleUrls: ['./cardiovascular.component.scss'],
})
export class CardiovascularComponent implements OnInit {

    pain: any = 0;
    painDisable: boolean = false;
    breath: any = 0;
    breathDisable: boolean = false;
    legs: any = 0;
    legsDisable: boolean = false;
    cough: any = 0;
    coughDisable: boolean = false;
    hoarseness: any = 0;
    hoarsenessDisable: boolean = false;
    fatique: any = 0;
    fatiqueDisable: boolean = false;
    weight: any = 0;
    weightDisable: boolean = false;
    offStatus: boolean;
    scroll = true;

    zero = '../../../assets/numbers/zero.png';
    one = '../../../assets/numbers/one.png';
    two = '../../../assets/numbers/two.png';
    three = '../../../assets/numbers/three.png';
    four = '../../../assets/numbers/four.png';
    five = '../../../assets/numbers/five.png';

    date = new Date();
    dd = String(this.date.getDate()).padStart(2, '0');
    mm = String(this.date.getMonth() + 1).padStart(2, '0'); // January is 0!
    yyyy = this.date.getFullYear();
    today = this.yyyy + '-' + this.mm + '-' + this.dd;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        public navCtrl: NavController,
        private afStore: AngularFirestore,
        private Uauth: AuthService) {
    }


    ngOnInit() {
    }

    painChange(event) {
        this.pain = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    pain: this.pain
                }
            }, {merge: true});
        // return this.painDisable = true;
    }

    breathChange(event) {
        this.breath = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    shortnessOfBreath: this.breath
                }
            }, {merge: true});
        // return this.breathDisable = true;
    }

    legsChange(event) {
        this.legs = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    sweatLegs: this.legs
                }
            }, {merge: true});
        // return this.legsDisable = true;
    }

    coughChange(event) {
        this.cough = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    cough: this.cough
                }
            }, {merge: true});
        // return this.coughDisable = true;
    }

    hoarsenessChange(event) {
        this.hoarseness = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    hoarseness: this.hoarseness
                }
            }, {merge: true});
        // return this.hoarsenessDisable = true;
    }

    fatiqueChange(event) {
        this.fatique = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    fatique: this.fatique
                }
            }, {merge: true});
        // return this.fatiqueDisable = true;
    }

    weightChange(event) {
        this.weight = event;
        console.log(event);
        this.afStore
            .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
            .set({
                cardiovascular: {
                    unexplainedLossOfWeight: this.weight
                }
            }, {merge: true});
        // return this.weightDisable = true;
    }
}
