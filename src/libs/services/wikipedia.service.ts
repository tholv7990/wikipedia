import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  private readonly api = 'wiki/';

  constructor(private http: HttpClient) { }

  public getData(): Observable<number[]> {

    const url = `${this.api}Women%27s_high_jump_world_record_progression`

    return this.http.get(url, { responseType: 'text' })
      .pipe(
        map(html => {
          const $ = cheerio.load(html);

          const table = $('table.wikitable');
          const rows = table.find('tr');

          const tableData = [];
          rows.each((i, elem) => {
            const row = [];
            $(elem).find('td').each((j, td) => {
              row.push($(td).text().trim());
            });
            tableData.push(row);
          });

          return tableData;
        })
      );
  }

}
