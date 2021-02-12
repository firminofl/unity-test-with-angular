import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';

const routes: Routes = [
  {
    path: '', component: HeroListComponent
  },
  {
    path: 'details', component: HeroDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroListRoutingModule { }
