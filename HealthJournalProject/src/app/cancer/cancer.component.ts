import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';

import {AuthService} from 'src/app/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-cancer',
  templateUrl: './cancer.component.html',
  styleUrls: ['./cancer.component.scss'],
})
export class CancerComponent implements OnInit {

  pain: any = 0;
  painDisable: boolean = false;
  stomachProblem: any = 0;
  stomachDisable: boolean = false;
  dryMouth: any = 0;
  dryMouthDisable: boolean = false;
  skinSensitivity: any = 0;
  skinSensitivityDisable: boolean = false;
  neuropathy: any = 0;
  neuropathyDisable: boolean = false;
  tiredness: any = 0;
  tirednessDisable: boolean = false;
  swelling: any = 0;
  swellingDisable: boolean = false;
  bladderControlIssues: any = 0;
  bladderControlIssuesDisable: boolean = false;
  unintentionalWeight: any = 0;
  unintentionalWeightDisbale: boolean = false;
  nightSweatsFlashes: any = 0;
  nightSweatsFlashesDisable: boolean = false;

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
        cancer:
          {pain: this.pain}
      }, {merge: true});
    // return this.painDisable = true;
  }

  stomachProblemChange(event) {
    this.stomachProblem = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          stomachProblem: this.stomachProblem
        }
      }, {merge: true});
    // return this.stomachDisable = true;
  }

  dryMouthChange(event) {
    this.dryMouth = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          dryMouth: this.dryMouth
        }
      }, {merge: true});
    // return this.dryMouthDisable = true;
  }

  skinSensitivityChange(event) {
    this.skinSensitivity = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          skinSensitivity: this.skinSensitivity
        }
      }, {merge: true});
    // return this.skinSensitivityDisable = true;
  }

  neuropathyChange(event) {
    this.neuropathy = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          neuropathy: this.neuropathy
        }
      }, {merge: true});
    // return this.neuropathyDisable = true;
  }

  tirednessChange(event) {
    this.tiredness = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          tiredness: this.tiredness
        }
      }, {merge: true});
    // return this.tirednessDisable = true;
  }

  swellingChange(event) {
    this.swelling = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          swelling: this.swelling
        }
      }, {merge: true});
    // return this.swellingDisable = true;
  }

  bladderControlIssuesChange(event) {
    this.bladderControlIssues = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          bladderControlIssues: this.bladderControlIssues
        }
      }, {merge: true});
    // return this.bladderControlIssuesDisable = true;
  }

  unintentionalWeightChange(event) {
    this.unintentionalWeight = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          unintentionalWeight: this.unintentionalWeight
        }
      }, {merge: true});
    // return this.unintentionalWeightDisbale = true;
  }

  nightSweatsFlashesChange(event) {
    this.nightSweatsFlashes = event;
    console.log(event);
    this.afStore
      .doc(`users/${this.Uauth.cUid}/survey/${this.today}`)
      .set({
        cancer: {
          nightSweatsFlashes: this.nightSweatsFlashes
        }
      }, {merge: true});
    // return this.nightSweatsFlashesDisable = true;
  }
}
