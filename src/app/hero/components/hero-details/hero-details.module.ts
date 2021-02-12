import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailsComponent } from './hero-details.component';
import { HeroStorageService } from '../../shared/services/storage/hero-storage.service';
import { HeroDetailsPipe } from '../../shared/pipes/hero-details.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    HeroDetailsComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeroDetailsComponent
  ],
  providers: [
    HeroStorageService,
    HeroDetailsPipe
  ]
})
export class HeroDetailsModule { }
