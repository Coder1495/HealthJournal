import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from 'src/app/auth.service';
import {AlertController, Platform} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

import {UserService} from 'src/app/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProfileElement, ProfileService} from 'src/app/profile.service';

import {FCM} from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public Profile: Observable<ProfileElement>;

  uid;
  latitude = 34.10413;
  longitude = -117.71267;
  verifiedEmail = true;
  feelDisable: boolean;
  happy: any = '../../../assets/1.png';
  smile = '../../../assets/2.png';
  normal = '../../../assets/3.png';
  sad = '../../../assets/4.png';
  cry = '../../../assets/5.png';

  constructor(
    private afStore: AngularFirestore,
    public Uauth: AuthService,
    public alert: AlertController,
    public afAuth: AngularFireAuth,
    private user: UserService,
    private proService: ProfileService,
    private router: Router,
    private geolocation: Geolocation,
    private fcm: FCM,
    public plt: Platform) {
    this.uid = this.Uauth.cUid;
    //  this.Profile = this.user.getUser(this.uid);
    this.Profile = this.proService.pro(this.uid);

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
            console.log('Received in foreground');
          }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      });

    this.verifiedEmail = this.afAuth.auth.currentUser.emailVerified;
    console.log('verified', this.verifiedEmail);
  }

  submit(parameter) {
    const feelings = parameter;

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd;

    this.afStore.doc(`users/${this.uid}/survey/${today}`)
      .set({
        feel: feelings
      }, {merge: true});
    console.log(feelings);
    this.feelDisable = true;

    const latitude = this.latitude;
    const longitude = this.longitude;
    this.user.setLocation({
      location: {latitude, longitude}
    }, this.uid);
    return this.router.navigate(['/tabs/questions']);
  }

  ngOnInit() {
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await (await alert).present();
  }

  resendEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    console.log('We have sent you an email verification');
    this.showAlert('Verification', 'We have sent you an email verification');
  }

  reload() {
    window.location.reload();
  }

}
