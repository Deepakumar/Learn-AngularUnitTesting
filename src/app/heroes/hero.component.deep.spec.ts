import { HeroComponent } from './../hero/hero.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  naviageTo: any = null;
  onClick() {
    this.naviageTo = this.linkParams;
  }
}

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
      declarations : [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      //schemas : [NO_ERRORS_SCHEMA],
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

  it('should call HeroService.deleteHero when the HEro Componnt\'s delete button is clicked',() => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it('should call HeroService.deleteHero when the HEro Componnt\'s delete button is clicked 1',() => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it('should call HeroService.deleteHero when the HEro Componnt\'s delete button is clicked 2',() => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    heroComponents[0].triggerEventHandler('delete',null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it('Should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name =" Mr. Ice";

    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, stength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should add a new hero to the list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
  });

});
