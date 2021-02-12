import { Injectable } from '@angular/core';
import { IHeroListUserResponseDto } from 'src/app/hero/dtos/hero-list-users.dto';

@Injectable({
  providedIn: 'root'
})
export class HeroStorageService {

  private user: IHeroListUserResponseDto | any;

  constructor() { 
    this.user = undefined;
  }

  setUser(user: IHeroListUserResponseDto) {
    this.user = user;
  }

  getUser(): IHeroListUserResponseDto | any {
    return this.user;
  }
}
