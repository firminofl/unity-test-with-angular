import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroListRoutingModule } from './hero-routing.module';

import { HeroListModule } from './components/hero-list/hero-list.module'
import { HeroDetailsModule } from './components/hero-details/hero-details.module';
import { HeroDetailsPipe } from './shared/pipes/hero-details.pipe';

@NgModule({
  declarations: [HeroDetailsPipe],
  imports: [
    CommonModule,
    HeroListRoutingModule,
    HeroListModule,
    HeroDetailsModule
  ],
  exports: []
})
export class HeroModule { }
