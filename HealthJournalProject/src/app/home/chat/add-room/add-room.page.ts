import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import * as firebase from 'Firebase';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.page.html',
    styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {

    data = {roomName: ''};
    ref = firebase.database().ref('chatrooms/');

    constructor(
        public navCtrl: NavController
    ) {
    }

    addRoom() {
        const newData = this.ref.push();
        newData.set({
            roomName: this.data.roomName
        });
        this.navCtrl.pop();
    }

    ngOnInit() {
    }

}
