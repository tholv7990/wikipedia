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

  public getData(url: string): Observable<number[]> {

    const fullURL = `${this.api}${url}`;

    console.log('test 1 ', fullURL)

    return this.http.get(fullURL, { responseType: 'text' })
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

          return this.extractNumericValues(tableData);
        })
      );
  }

  private extractNumericValues(tableData: any[]): number[] {

    const heights: number[] = [];

    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];

      if (row.length > 0) {
        // get the first row which contain the numeric
        let height = row[0];

        // 
        height = height.substring(0, height.indexOf(" "));

        const heightNumber = parseFloat(height);
        if (!isNaN(heightNumber)) {
          heights.push(heightNumber);
        }
      }
    }

    return heights;
  }

}
