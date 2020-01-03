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

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule( {
      declarations : [HeroesComponent, HeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      schemas : [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });


  it('Should render each hero as a HeroComponent', () => {
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponent.length).toEqual(3);

    expect(heroComponent[0].componentInstance.hero.name).toEqual('SpiderDude');

    for (let i = 0; i < heroComponent.length; i++){
      expect(heroComponent[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

});
