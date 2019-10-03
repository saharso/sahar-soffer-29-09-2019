import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { LocationItem } from 'src/app/shared/models/location.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() currentWeather: CurrentWeather;
  @Input() keepFahrenheit: boolean
  @Input() currentLocation: LocationItem;
  @Output() onAddToFavorites = new EventEmitter<CurrentWeather>();
  @Output() onRemoveFromFavorites = new EventEmitter<CurrentWeather>();

  
  iconUrl: string;

  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { 
    this.iconUrl = this.ngRedux.getState().iconUrl;
  }

  ngOnInit() {}

  addToFavorites(){
    this.onAddToFavorites.emit( this.currentWeather );
  }
  removeFromFavorites(){
    this.onRemoveFromFavorites.emit( this.currentWeather );
  }

}
