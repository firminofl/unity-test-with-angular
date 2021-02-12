import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HeroHelperService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  initializeForm() {
    return this.formBuilder.group({
      nome: ['']
    });
  }
}
