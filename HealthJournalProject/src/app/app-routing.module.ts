import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./home/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'add-room',
        loadChildren: () => import('./home/chat/add-room/add-room.module').then(m => m.AddRoomPageModule)
    },
    {
        path: 'chat',
        loadChildren: () => import('./home/chat/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'profile/:id',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },  {
    path: 'stats',
    loadChildren: () => import('./home/stats/stats.module').then( m => m.StatsPageModule)
  }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
