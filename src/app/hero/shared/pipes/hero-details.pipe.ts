import { Pipe, PipeTransform } from '@angular/core';
import { IHeroListUserResponseDto } from '../../dtos/hero-list-users.dto';

@Pipe({
  name: 'heroDetails'
})
export class HeroDetailsPipe implements PipeTransform {

  transform(user: IHeroListUserResponseDto, ...args: unknown[]): string {
    return `${user.id} | ${user.name} - ${user.username} | ${user.phone}`;
  }

}
