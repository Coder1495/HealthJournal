import {Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'Firebase';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {ProfileService} from 'src/app/profile.service';
import {AngularFireAuth} from '@angular/fire/auth';

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  public firebaseAuthService: AngularFireAuth;

  data = {type: '', nickName: '', message: ''};
  chats: any = [];
  roomkey: string = null;
  nickName: string = null;
  patient: string = null;
  offStatus: boolean;

  constructor(
    private Aroute: ActivatedRoute,
    private router: Router,
    private proService: ProfileService,
    private afAuth: AngularFireAuth
  ) {
    this.firebaseAuthService = afAuth;
    this.nickName = this.proService.nickName;
    this.patient = this.proService.patient;
    try {
      if (this.patient === 'cancer') {
        this.roomkey = '-M6u0AtMOUFBdwYX6lwY';
      } else {
        this.roomkey = '-M6u0M1Lr6G34ZI_kka0';
      }
    } catch {
      console.log('Patient does not exist');
    }

    this.offStatus = false;
    this.data.type = 'message';
    this.data.nickName = this.nickName;

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  sendMessage() {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickName,
      userId: this.firebaseAuthService.auth.currentUser.uid,
      message: this.data.message,
      sendDate: new Date().toUTCString()
    });
    this.data.message = '';
    console.log(newData);

  }

  ngOnInit() {
  }

  backbtn() {
    this.router.navigate(['/']);
  }
}

