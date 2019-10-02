import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from '../redux/store';
import { CurrentWeather } from '../models/current-weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteSet: CurrentWeather[] = [];

  constructor(
    private ngRedux: NgRedux<AppState>,
  ) {
    this.getFavorites();
  }
  
  getFavorites(){
    const rawData = window.localStorage.getItem( 'favorites' );
    if ( rawData ){
      this.favoriteSet = JSON.parse ( rawData );
    } else {
      this.favoriteSet = new Array();
    }
    this.dispatchFavorites();
    this.updateLocalStorage();
  }

  addToFavofites( fav ){
    if ( this.favoriteSet.find( e => e.key === fav.key ) ) return;
    this.favoriteSet.push( fav );
    this.dispatchFavorites();
    this.updateLocalStorage();
  }

  removeFromFavorites( fav ){
    this.favoriteSet.splice( this.favoriteSet.findIndex( e => e.key === fav.key ), 1 );
    this.dispatchFavorites();
    this.updateLocalStorage();
  }

  private dispatchFavorites(){
    this.ngRedux.dispatch( {
      type: actionList.GET_FAVORITES,
      data: Array.from( this.favoriteSet ),
    } );
  }

  private updateLocalStorage(){
    window.localStorage.setItem( 'favorites', JSON.stringify( Array.from( this.favoriteSet ) ) );
  }

}
 