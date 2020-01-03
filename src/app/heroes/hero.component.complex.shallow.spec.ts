import { HeroComponent } from './../hero/hero.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
describe('HeroComponent Shallow Intergrations', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES = [
    {id: 1, name: 'SpiderDude', strength: 8},
    {id: 2., name: 'Wonderful Woman', strength: 24},
    {id: 3, name: 'SuperDude', strength: 55}
  ];

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
   class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule( {
      declarations : [HeroesComponent, FakeHeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      schemas : [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('Should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create on li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});
