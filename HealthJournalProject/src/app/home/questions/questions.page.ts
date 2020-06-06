import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {CardiovascularComponent} from '../../cardiovascular/cardiovascular.component';
import {CancerComponent} from '../../cancer/cancer.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/user.service';
import {AuthService} from 'src/app/auth.service';
import {ProfileService} from 'src/app/profile.service';
import {RatingComponent} from './rating/rating.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.page.html',
    styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    // info: Observable<Userelement>;
    profile;
    offStatus = false;
    uid;
    public ratingSelected = -1;

    constructor(
        private router: Router,
        private aRoute: ActivatedRoute,
        private auth: AuthService,
        private pro: ProfileService,
        private user: UserService,
        public cardi: CardiovascularComponent,
        public canc: CancerComponent
    ) {
        this.uid = this.auth.cUid;
    }

    ngOnInit() {
        this.profile = this.pro.patient;
    }

    scroll() {
        setTimeout(() => {
            if (this.offStatus === false) {
                this.content.scrollToBottom(300);
            }
        }, 1000);

    }

    goNextPage(questions: RatingComponent[]) {
        for (const question of questions) {
            question.ratingSelected = -1;
        }
        this.ratingSelected = -1;
        this.router.navigate(['/tabs/questions/document']);
    }

    refresh() {
        window.location.reload();
    }
}
