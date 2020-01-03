import { TestBed, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let msgSvc: MessageService;
  let heroSvc: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    msgSvc = TestBed.get(MessageService);
    heroSvc = TestBed.get(HeroService);


  });

    // it('should call get with the correct URL', () => {
    //   heroSvc.getHero(4).subscribe();

    //   const req = httpTestingController.expectOne('api/heroes/4');
    //   req.flush({id: 4, name: 'SuperDude', strength: 100});
    //   httpTestingController.verify();
    // });

    xit('should call get with the correct URL',
    inject([HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe();
    }));

    it('should call get with the correct URL', () => {
      heroSvc.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});
    });

});
