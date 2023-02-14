import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WikipediaService } from 'src/libs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public loading = false;
  public heights: number[] = [];

  constructor(
    private wikipediaService: WikipediaService
  ) { }

  public async onGetData() {
    this.loading = true;

    this.heights = await lastValueFrom(this.wikipediaService.getData());
    this.loading = false;
  }
}
