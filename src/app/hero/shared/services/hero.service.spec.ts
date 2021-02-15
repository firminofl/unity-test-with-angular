import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs'

import { HeroService } from './hero.service';
import { mockHeroListUserResponseDto } from '../../mocks/hero-list-users.mock';
import { IHeroListUserResponseDto } from '../../dtos/hero-list-users.dto';
import { mockHeroListSearchName } from '../../mocks/hero-list-search.mock';
import { IHeroListSearchName } from '../../dtos/hero-list-search-name.dto';

describe('HeroService', () => {
  let service: HeroService;
  let httpServiceMock: jasmine.SpyObj<HttpClient>;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpServiceMock }
      ]
    });

    service = TestBed.inject(HeroService);
    mockHttp = TestBed.inject(HttpTestingController);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#getUsers", () => {
    it("#getUser should get the list of users with success", () => {
      httpServiceMock.get.and.returnValue(
        of(mockHeroListUserResponseDto)
      )
  
      service.getUser().subscribe({
        next: (response: IHeroListUserResponseDto[]) => {
          expect(response).toEqual(mockHeroListUserResponseDto);
          expect(service.getUser).toHaveBeenCalled();
        },
        error: (error: Error) => {
          console.log(error);
        }
      })
    });
  
    it("#getUser should get the list of users with fail", () => {
      httpServiceMock.get.and.returnValue(
        throwError({
          message: 'Fake error'
        })
      )
  
      service.getUser().subscribe({
        next: (response: IHeroListUserResponseDto[]) => {
          console.log(response);
        },
        error: (error: Error) => {
          console.log(error);
          expect(error.message).toEqual('Fake error');
        }
      })
    });
  });

  describe("#searchName", () => {
    it("#searchName should search name with success", () => {
      httpServiceMock.post.and.returnValue(
        of(mockHeroListSearchName)
      )
  
      service.searchName('teste').subscribe({
        next: (response: IHeroListSearchName[]) => {
          expect(response).toEqual(mockHeroListSearchName);
          expect(service.getUser).toHaveBeenCalled();
        },
        error: (error: Error) => {
          console.log(error);
        }
      })
    });

    it("#searchName should search name with success", () => {
      httpServiceMock.post.and.returnValue(
        throwError({
          message: 'Fake error'
        })
      )
  
      service.searchName('teste').subscribe({
        next: (response: IHeroListSearchName[]) => {
          expect(response).toEqual(mockHeroListSearchName);
          expect(service.getUser).toHaveBeenCalled();
        },
        error: (error: Error) => {
          expect(error.message).toEqual('Fake error');
        }
      })
    });
  })
});
