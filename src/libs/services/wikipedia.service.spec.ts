import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WikipediaService } from './wikipedia.service';

describe('WikipediaService', () => {

  let service: WikipediaService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- Inject the HttpClientTestingModule
      providers: [WikipediaService]
    });
    service = TestBed.inject(WikipediaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the Wikipedia page and retrieve the HTML response', () => {
    const url = 'Women%27s_high_jump_world_record_progression';

    service.getData(url).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(req => {
      return req.url === `wiki/${url}`;
    });

    expect(req.request.method).toEqual('GET');

    req.flush('<html></html>');
  });


});
