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

  it('should parse the HTML response and extract the numeric data from the table', () => {
    const url = 'Women%27s_high_jump_world_record_progression';
    const html = `
      <table class="wikitable">
        <tr>
          <td>1.46 m (4 ft 9+1⁄4 in)</td>
          <td>1.60</td>
        </tr>
        <tr>
          <td>1.485 m (4 ft 10+1⁄4 in)</td>
          <td>1.62</td>
        </tr>
      </table>
    `;

    service.getData(url).subscribe(data => {
      expect(data).toEqual([
        1.46, 1.485
      ]);
    });

    const req = httpTestingController.expectOne(`wiki/${url}`);
    req.flush(html);
  });

});
