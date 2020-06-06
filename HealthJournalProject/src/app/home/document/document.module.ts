import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {DocumentPage} from './document.page';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {TagInputModule} from 'ngx-chips';


@NgModule({
    imports: [
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
        AngularFireDatabaseModule,
        RouterModule.forChild([{path: '', component: DocumentPage}])
    ],
    declarations: [DocumentPage]
})
export class DocumentPageModule {
}
