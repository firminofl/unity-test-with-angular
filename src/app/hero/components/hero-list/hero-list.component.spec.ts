import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { IHeroListUserResponseDto } from '../../dtos/hero-list-users.dto';
import { mockHeroListSearchName } from '../../mocks/hero-list-search.mock';
import { mockHeroListUserResponseDto } from '../../mocks/hero-list-users.mock';
import { HeroHelperService } from '../../shared/services/helper/hero-helper.service';
import { HeroService } from '../../shared/services/hero.service';
import { HeroStorageService } from '../../shared/services/storage/hero-storage.service';

import { HeroListComponent } from './hero-list.component';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockHeroStorageService: jasmine.SpyObj<HeroStorageService>;
  let mockHeroHelperService: jasmine.SpyObj<HeroHelperService>;

  const mockUser: IHeroListUserResponseDto = mockHeroListUserResponseDto[0];

  beforeEach(async () => {
    // Criando os Spys para os métodos que utilizamos no componente.
    mockHeroService = jasmine.createSpyObj('HeroService', ['getUser', 'searchName']);
    mockHeroStorageService = jasmine.createSpyObj('HeroStorageService', ['setUser']);
    mockHeroHelperService = jasmine.createSpyObj('HeroHelperService', ['initializeForm'])

    // Fazendo a inicialização padrão antes de cada teste, já que estamos dentro do contexto de beforeEach
    mockHeroService.getUser.and.returnValue(
      of(mockHeroListUserResponseDto)
    );
    
    mockHeroHelperService.initializeForm.and.returnValue(
      new FormBuilder().group({
        nome: ['']
      })
    );

    mockHeroStorageService.setUser.withArgs(mockUser);
    
    await TestBed.configureTestingModule({
      declarations: [ HeroListComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: HeroService, useValue: mockHeroService },
        { provide: HeroStorageService, useValue: mockHeroStorageService },
        { provide: HeroHelperService, useValue: mockHeroHelperService },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#methods of component", () => {
    it("#details should test the navigate between pages", () => {
      component.details(mockUser);

      expect(mockRouter.navigate).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/details']);
    });

    it("#getUsersByService should throw error", () => {
      // 1º devemos mockar o retorno do serviço que neste caso é um erro na requisição HTTP.
      mockHeroService.getUser.and.returnValue(
        throwError('Fake error')
      );

      // Criando um Spy temporário do recurso de alert do navegador para testá-lo
      spyOn(window, "alert");

      // Chamando o método do componente para testar.
      component.getUsersByService();
      
      // Testar se o elemento de alerta do navegador foi aberto
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Fake error");

      // Testar se o método no serviço foi chamado
      expect(mockHeroService.getUser).toHaveBeenCalled();  
    });

    it("#searchName should search name with success in service", () => {
      // como fizemos a inicialização do formulário no beforeEach, agora temos acesso ao controle
      // do formulário e modificar seu valor
      const fakeName = 'Fake name';
      component.form.controls.nome.patchValue(fakeName);

      mockHeroService.searchName.withArgs(fakeName).and.returnValue(
        of(mockHeroListSearchName)
      );

      component.searchName();

      expect(mockHeroService.searchName).toHaveBeenCalled();
      expect(mockHeroService.searchName).toHaveBeenCalledWith(fakeName);
      expect(component.isLoading).toEqual(false);
      expect(component.isNameValid).toEqual(true);
    });

    it("#searchName should search name with fail in service", () => {
      // como fizemos a inicialização do formulário no beforeEach, agora temos acesso ao controle
      // do formulário e modificar seu valor
      const fakeName = 'Fake name';
      component.form.controls.nome.patchValue(fakeName);

      // Criando um Spy temporário do recurso de alert do navegador para testá-lo
      spyOn(window, "alert");

      // Mockando a chamada ao serviço com passagem de parâmetros
      mockHeroService.searchName.withArgs(fakeName).and.returnValue(
        throwError('Fake error')
      );

      component.searchName();

      expect(mockHeroService.searchName).toHaveBeenCalled();
      expect(mockHeroService.searchName).toHaveBeenCalledWith(fakeName);

      // Testar se o elemento de alerta do navegador foi aberto
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Fake error");
      
      expect(component.isLoading).toEqual(false);
      expect(component.isNameValid).toEqual(false);
    });

    it("#searchName should search name without value in form", () => {
      // como fizemos a inicialização do formulário no beforeEach, agora temos acesso ao controle
      // do formulário e modificar seu valor
      const fakeName = null;
      component.form.controls.nome.patchValue(fakeName);

      // Criando um Spy temporário do recurso de alert do navegador para testá-lo
      spyOn(window, "alert");

      component.searchName();

      // Testar se o elemento de alerta do navegador foi aberto
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Insira um nome na pesquisa");
    });
  });
});
