import { Component, OnInit } from '@angular/core';
import { HeroDetailsPipe } from '../../shared/pipes/hero-details.pipe';
import { HeroStorageService } from '../../shared/services/storage/hero-storage.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  userDetails: string;

  isLoading: boolean;
  titleOfSection: string;

  constructor(
    private storageService: HeroStorageService,
    private pipeUser: HeroDetailsPipe
  ) { 
    this.userDetails = '';
    this.isLoading = true;
    this.titleOfSection = 'Detalhes do usuário';
  }

  ngOnInit(): void {
    this.isLoading = true;
    const getUserDetails = this.storageService.getUser();
    this.userDetails = this.pipeUser.transform(getUserDetails);
    this.isLoading = false;
  }

  back() {
    window.history.back();
  }

}
