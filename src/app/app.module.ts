import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState, rootReducer, initAppState } from './shared/redux/store';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule, Routes, DetachedRouteHandle, ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { CurrentWeatherComponent } from './components/main/current-weather/current-weather.component';
import { ForecastComponent } from './components/main/forecast/forecast.component';
import { CelsiusFarenheitPipe } from './shared/pipes/celsius.pipe';
import { IconComponent } from './components/_shared/icon/icon.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavItemComponent } from './components/_shared/nav-item/nav-item.component';
import { NavItemSetComponent } from './components/_shared/nav-item-set/nav-item-set.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DegRangeComponent } from './components/_shared/deg-range/deg-range.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { 
    path: 'main/:key/:name',
    component: MainComponent,
  },
  { 
    path: 'main',
    component: MainComponent,
  },
  { 
    path: 'favorites',
    component: FavoritesComponent,
  },

  { 
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FavoritesComponent,
    LocationSearchComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    CelsiusFarenheitPipe,
    IconComponent,
    TopBarComponent,
    NavItemComponent,
    NavItemSetComponent,
    LayoutComponent,
    DegRangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot( routes ),
    AutoCompleteModule,
    ToastModule,
    TooltipModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgReduxModule,
  ],
  providers: [
    MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( ngRedux: NgRedux<AppState>){
    ngRedux.configureStore( rootReducer, initAppState );
  }
}
