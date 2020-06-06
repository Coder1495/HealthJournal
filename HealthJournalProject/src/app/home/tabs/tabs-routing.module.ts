import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../chat/home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'questions',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../questions/questions.module').then(m => m.QuestionsPageModule)
                    }
                ]
            },
            {
                path: 'questions/document',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../document/document.module').then(m => m.DocumentPageModule)
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../settings/settings.module').then(m => m.SettingsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
