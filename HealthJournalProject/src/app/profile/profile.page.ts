import {Component, OnInit} from '@angular/core';
import {ProfileElement, ProfileService} from '../profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    uid: any;
    updateUid: any;

    public profile: ProfileElement = {
        fullName: '',
        nickName: '',
        gender: '',
        age: null,
        patient: '',
        maritalStatus: '',
        work: '',
        natureOfJob: '',
        chronicProblem: '',
        hospital: '',
        doctor: '',
        procedure: '',
        medication: '',
        sideEffect: '',
        ethnicity: '',
        foodHabbit: '',
        citiesLivedpast: '',
        state: '',
        city: '',
        streetName: '',
        streetNumber: null,
        zipCode: null,
    };

    constructor(
        private activeR: ActivatedRoute,
        private proService: ProfileService,
        private router: Router,
        private aRoute: ActivatedRoute,
        public afAuth: AngularFireAuth,
        private auth: AuthService) {
    }

    ngOnInit() {
        this.updateUid = this.auth.cUid;
    }

    ionViewWillEnter() {
        const id = this.activeR.snapshot.paramMap.get('id');
        if (id) {
            this.proService.pro(id).subscribe(pro => {
                this.profile = pro;
            });
        }
    }

    createProfile() {
        this.aRoute.queryParams.subscribe(params => {
            if (params && params.uid) {
                this.uid = params.uid;
                console.log(this.uid);
            }
        });
        this.proService.setProfile(this.profile, this.uid).then(() => {
            this.router.navigateByUrl('/');
        });
    }

    updateProfile() {
        this.proService.updateProfile(this.profile, this.updateUid);
        this.router.navigate(['/tabs/settings']);
    }

    back() {
        this.router.navigateByUrl('/');
    }

}
