import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { fallbackRoute } from './shared/fallback-route';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'cards', component: CardsComponent,
        canActivate: [LoginGuard]
      },
      { path: 'cards/:type', component: CardsComponent },
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  fallbackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
