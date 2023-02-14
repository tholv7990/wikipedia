import { Component, ElementRef, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WikipediaService } from 'src/libs';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public graphImage: string;
  public heights: number[];
  public loading = false;
  public lineChartData: ChartDataset[]
  public lineChartLabels: any[];
  public lineChartOptions = {
    responsive: false
  };
  public image: null;

  @ViewChild('canvas') canvas: ElementRef;

  constructor(
    private wikipediaService: WikipediaService
  ) { }

  public async onGetData() {
    this.loading = true;

    this.heights = await lastValueFrom(this.wikipediaService.getData());
    this.loading = false;
  }

  public onPlottingChart() {

    const labels = [];

    for (let i = 1; i < this.heights.length + 1; i++) {
      labels.push(i)
    }

    this.lineChartData = [
      { data: this.heights, label: 'Wikipedia Heights' },
    ];

    this.lineChartLabels = labels;
  }
}
