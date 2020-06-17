import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service'; // import Authservice from auth.service
import {LoginComponent} from '../../login/login.component'; // import login elements from login component
import {RegisterPage} from 'src/app/register/register.page';
import {GoogleComponent} from '../../google/google.component';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  logo = '../../../assets/logo.png';

  constructor(
    public Uauth: AuthService,
    public afAuth: AngularFireAuth,
    public ln: LoginComponent,
    public rg: RegisterPage,
    public gp: GoogleComponent
  ) {
  }

  ngOnInit() {
  }

//  unreadSmsCount() {
//    const SmsCount = 0;
  //   const conversationList = 'true';
  //   if ( conversationList ) {
  //    for (let i = 0; i < conversationList.length; i++) {
  //      SmsCount += conversationList[i].messages.length - conversationsInfo[i].messagesRead;
  //      if (SmsCount === 0) {
  //        SmsCount = null;
  //      }
  //  }
  // }
  // getUnreadMessagesCount() {
  //  if (this.unreadMessagesCount) {
  //    if (this.unreadMessagesCount > 0) {
  //      return this.unreadMessagesCount;
  //    }
  //  }
  //   return null;
  // }
}
