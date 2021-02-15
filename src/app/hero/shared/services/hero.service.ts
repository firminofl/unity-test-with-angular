import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHeroListSearchName } from '../../dtos/hero-list-search-name.dto';
import { IHeroListUserResponseDto } from '../../dtos/hero-list-users.dto';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpService: HttpClient) { }

  getUser(): Observable<IHeroListUserResponseDto[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    }

    return this.httpService.get<IHeroListUserResponseDto[]>(url, { headers })
  }

  searchName(name: string): Observable<IHeroListSearchName[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    }

    const body = {
      name
    }

    return this.httpService.post<IHeroListSearchName[]>(url, body, { headers })
  }
}
