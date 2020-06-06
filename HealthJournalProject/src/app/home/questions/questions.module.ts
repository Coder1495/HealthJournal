import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {QuestionsPage} from './questions.page';

import {IonicRatingModule} from 'ionic-rating';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CardiovascularComponent} from '../../cardiovascular/cardiovascular.component';
import {CancerComponent} from '../../cancer/cancer.component';
import {RatingComponent} from './rating/rating.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicRatingModule,
        AngularFireDatabaseModule,
        RouterModule.forChild([{path: '', component: QuestionsPage}])
    ],
    declarations: [QuestionsPage, RatingComponent],
    providers: [CardiovascularComponent, CancerComponent]
})
export class QuestionsPageModule {
}
