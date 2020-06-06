import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {ProfileElement, ProfileService} from 'src/app/profile.service';
import {AuthService} from 'src/app/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    Profile: Observable<ProfileElement>;
    public uid;

    constructor(
        private router: Router,
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private proService: ProfileService) {
        this.uid = this.auth.cUid;
    }

    logOut() {
        this.afAuth.auth.signOut();
        return this.router.navigate(['/tabs']);
    }

    ngOnInit() {
        this.Profile = this.proService.pro(this.uid);
    }

    reload() {
        window.location.reload();
    }

}
