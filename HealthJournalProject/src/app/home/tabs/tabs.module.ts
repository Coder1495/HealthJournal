import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {LoginComponent} from '../../login/login.component';
import {RegisterPage} from '../../register/register.page';
import {GoogleComponent} from '../../google/google.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule
    ],
    declarations: [TabsPage],
    providers: [LoginComponent, RegisterPage, GoogleComponent]
})
export class TabsPageModule {
}
