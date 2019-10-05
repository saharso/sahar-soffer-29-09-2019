import { Component, OnInit, Input } from '@angular/core';
import { ForeCast, DailyForecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'hwt-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  @Input() set foreCast( foreCast: ForeCast ){
    if ( ! foreCast ) return;
    this.foreCastList = foreCast.DailyForecasts;
  }

  foreCastList: DailyForecast[];
  constructor() { }

  ngOnInit() {
  }

}
