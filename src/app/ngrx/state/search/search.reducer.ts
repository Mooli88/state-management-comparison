import { Action } from '@ngrx/store';
import { SearchActionTypes, SearchActions } from './search.actions';

export interface State {
  value: string;
}

export const initialState: State = {
  value: ''
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.SetSearchsTerm: {
      return {
        value: action.value
      };
    }

    case SearchActionTypes.ClearSearchsTerm: {
      return {
        value: ''
      };
    }

    default:
      return state;
  }
}

export const selectValue = state => state.value;
