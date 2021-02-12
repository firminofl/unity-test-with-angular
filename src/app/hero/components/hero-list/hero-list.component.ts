import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IHeroListUserResponseDto } from '../../dtos/hero-list-users.dto';
import { HeroHelperService } from '../../shared/services/helper/hero-helper.service';
import { HeroService } from '../../shared/services/hero.service';
import { HeroStorageService } from '../../shared/services/storage/hero-storage.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  isLoading: boolean;
  isNameValid: boolean;
  titleOfSection: string;

  users: IHeroListUserResponseDto[];

  form: FormGroup;

  constructor(
    private router: Router,
    private service: HeroService,
    private storageService: HeroStorageService,
    private helperService: HeroHelperService
  ) {

    this.form = this.helperService.initializeForm();
    this.isLoading = true;
    this.isNameValid = false;
    this.titleOfSection = 'Lista de usuários';
    this.users = [{
      id: 1,
      email: '',
      name: '',
      phone: '',
      username: '',
      website: '',
      company: {
        bs: '',
        catchPhrase: '',
        name: ''
      },
      address: {
        city: '',
        geo: {
          lat: '',
          lng: ''
        },
        street: '',
        suite: '',
        zipcode: ''
      }
    }]
  }

  ngOnInit(): void {
    this.getUsersByService();
  }

  getUsersByService() {
    this.isLoading = true;
      this.service.getUser().subscribe({
        next: (response: IHeroListUserResponseDto[]) => {
          this.isLoading = false;
          this.users = response;
        },
        error: (error: Error) => {
          console.error(error);
          alert(error);
        }
      })
  }

  get nome() {
    return this.form.controls.nome as FormGroup
  }

  details(user: IHeroListUserResponseDto) {
    this.storageService.setUser(user);

    this.router.navigate(['/details'])
  }

  searchName() {
    const name = this.nome.value;

    if (!name){
      return alert('Insira um nome na pesquisa')
    } 

    this.isLoading = true;
    this.service.searchName(name).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.isNameValid = true;
      },
      error: (error: Error) => {
        this.isLoading = false;
        this.isNameValid = false;
        alert(error)
      }
    })
  }
}
