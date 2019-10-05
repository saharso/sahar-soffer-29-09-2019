import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { LocationItem } from 'src/app/shared/models/location.model';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { ForeCast } from 'src/app/shared/models/forecast.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'hwt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  get currentWeather(): CurrentWeather {
    return this.dataService.setCurrentWeather();
  }

  get foreCast(): ForeCast {
    return this.ngRedux.getState().foreCast;
  }

  get loading(): string {
    const serverRequest = this.ngRedux.getState().serverRequest;
    if ( ! serverRequest ) return '';
    if ( serverRequest.id !== actionList.GET_CURRENT_WEATHER && serverRequest.id !== actionList.GET_FORECAST ) return;
    return this.ngRedux.getState().serverRequest.requestResult;
  }
  
  currentLocation: LocationItem
  isFavorite: boolean;
  keepFahrenheit: boolean;
  subscription: Subscription;
  locationFromRout: string;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit() {

    this.dataService.setDefaultSearch();
    this.dataService.setCurrentWeather();
    this.getDataByRoute();
    this.getWeateherDataFromServer();

    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.CHOOSE_LOCATION :
          this.getWeateherDataFromServer();
        break;
      }
    });

  }

  ngONDestroy(){
    this.subscription.unsubscribe();
  }

  getDataByRoute(){
    if ( ! this.route.snapshot.paramMap.get('key') ) return;
    const _currentLocation: LocationItem = new LocationItem();
    _currentLocation.key = decodeURI( this.route.snapshot.paramMap.get('key') );
    _currentLocation.name = decodeURI( this.route.snapshot.paramMap.get('name') );
    this.ngRedux.dispatch( {type: actionList.CHOOSE_LOCATION, data: _currentLocation} );
    this.getWeateherDataFromServer();
  }

  getWeateherDataFromServer(){
    this.currentLocation = this.ngRedux.getState().chosenLocation;
    if ( ! this.currentLocation ) return;
    this.subscription = this.dataService.getCurrentWeather( this.currentLocation.key ).subscribe();
    this.subscription = this.dataService.getForeCast( this.currentLocation.key ).subscribe()
  }

  addToFavorites( event: CurrentWeather ){
    event.isFavorite = true;
    this.favoritesService.addToFavofites( event );
  }

  removeFromFavorites( event ){
    event.isFavorite = false;
    this.favoritesService.removeFromFavorites( event );
  }


}
