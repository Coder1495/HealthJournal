import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';

import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireDatabaseModule,
    RouterModule.forChild([{path: '', component: HomePage}])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
