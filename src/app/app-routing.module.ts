import { AdminGuard } from './guards/admin-guard.service';
import { JudgeGuard } from './guards/judge-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'register',
    loadChildren: () => import ('./register/register.module').then(m => m.RegisterPageModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import ('./login/login.module').then(m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tournaments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tournament/tournament.module').then(m => m.TournamentPageModule)
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: () => import ('./event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'event-details',
    canActivate: [AuthGuard],
    loadChildren: () => import ('./event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  { 
    path: 'edit-score',
    canActivate: [AuthGuard, JudgeGuard],
    loadChildren: () => import ('./edit-score/edit-score.module').then(m => m.EditScorePageModule)
  },
  {
    path: 'edit-event',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import ('./edit-event/edit-event.module').then(m => m.EditEventPageModule)
  },
  {
    path: 'edit-tournament',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import ('./edit-tournament/edit-tournament.module').then(m => m.EditTournamentPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
