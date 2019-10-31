import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournament/tournament.module').then(m => m.TournamentPageModule)
  },
  {
    path: 'events',
    loadChildren: './event/event.module#EventPageModule'
  },
  {
    path: 'event-details',
    loadChildren: './event-details/event-details.module#EventDetailsPageModule'
  },
  { path: 'edit-score', loadChildren: './edit-score/edit-score.module#EditScorePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
