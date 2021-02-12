import { HeroDetailsPipe } from './hero-details.pipe';

describe('HeroDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
