import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { DataService } from 'src/app/shared/services/data.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'hwt-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  //favoriteList: CurrentWeather[] = [];

  constructor(
    private ngRedux: NgRedux<AppState>,
    private favoritesServcice: FavoritesService,
  ) { }

  get favoriteList(): CurrentWeather[] {
    return this.ngRedux.getState().favoriteList;
  }
  
  ngOnInit() {
    this.favoritesServcice.getFavorites();
  }

  removeFromFavorites( $event: MouseEvent, item: CurrentWeather ){
    $event.stopPropagation();
    $event.preventDefault();
    
    this.favoritesServcice.removeFromFavorites( item );
    
  }

}
