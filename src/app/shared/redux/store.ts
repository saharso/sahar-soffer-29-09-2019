import { ActionMethod } from './models/action-method';
import { Actions } from './models/actions';
import { DegUnit } from '../models/degUnit.model';
import { LocationItem } from '../models/location.model';
import { CurrentWeather } from '../models/current-weather.model';
import { ForeCast } from '../models/forecast.model';
import { ServerRequest } from '../models/server-request.model';
import { NavItemComponent } from 'src/app/components/_shared/nav-item/nav-item.component';

const updateState = ( state: AppState, action: ActionMethod, update: any ) => {
    const stateUpdate = Object.assign({},
        state,
        update,
        { 
            _currentAction: action.type,
        },
    );
    console.groupCollapsed('%c State '+ action.type + ' updated at ' + new Date(), 'color: lightblue' )
        console.log( stateUpdate );
    console.groupEnd();

    return stateUpdate;
}


export const actionList = Object.freeze( new Actions() );

export class AppState {
    _currentAction?: string;
    _containers?: any = {};
    ui_selectedNavItem?: NavItemComponent;
    ui_isSidebarOpen?: boolean;
    ui_degreeUnits?: DegUnit = 'celsius';
    ui_isDarkMode?: boolean;
    serverRequest?: ServerRequest = new ServerRequest();
    locationSearch?: LocationItem[];
    iconUrl?: string = 'https://www.accuweather.com/images/weathericons/';
    chosenLocation?: LocationItem = {
        key: '215854',
        name: 'Tel Aviv'
    };
    currentWeather?: CurrentWeather;
    foreCast?: ForeCast;
    favoriteAdded?: CurrentWeather[];
    favoriteList?: CurrentWeather[];
}

export const initAppState = Object.freeze( new AppState() );

export const rootReducer = ( state: AppState, action: ActionMethod ) => {

    let update: AppState;

    switch( action.type ){
        case actionList.GET_REQUEST_STATUS :
            update = {
                serverRequest: action.data,
            };
        return updateState( state, action, update );
        case actionList.UI__SELECT_NAV_ITEM :
            update = {
                ui_selectedNavItem: action.data,
            };
        return updateState( state, action, update );
        case actionList.UI__TOGGLE_SIDEBAR_VIEW :
            update = {
                ui_isSidebarOpen: action.data,
            };
        return updateState( state, action, update );
        case actionList.UI__SET_DEGREE_UNIT :
            update = {
                ui_degreeUnits: action.data,
            };
        return updateState( state, action, update );
        case actionList.UI__TOGGLE_DARK_MODE :
            update = {
                ui_isDarkMode: action.data,
            };
        return updateState( state, action, update );
        case actionList.SEARCH_LOCATION :
            update = {
                locationSearch: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_SEARCH_QUERY :
            update = {
                chosenLocation: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_CURRENT_WEATHER :
            update = {
                currentWeather: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_FORECAST :
            update = {
                foreCast: action.data,
            };
        return updateState( state, action, update );
        case actionList.UPDATE_FAVORITES :
            update = {
                favoriteAdded: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_FAVORITES :
            update = {
                favoriteList: action.data,
            };
        return updateState( state, action, update );


    }
    return state;
}