import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PanelComponent} from '../panel/panel.component';

import {IonicModule} from '@ionic/angular';

import {StatsPageRoutingModule} from './stats-routing.module';

import {StatsPage} from './stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule
  ],
  declarations: [StatsPage, PanelComponent]
})
export class StatsPageModule {
}
