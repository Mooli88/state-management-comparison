import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  SetSearchsTerm = '[Search] Set Search Term',
  ClearSearchsTerm = '[Search] Clear Search Term'
}

export class SetSearchsTerm implements Action {
  readonly type = SearchActionTypes.SetSearchsTerm;

  constructor(public value: string) {}
}

export class ClearSearchsTerm implements Action {
  readonly type = SearchActionTypes.ClearSearchsTerm;
}

export type SearchActions = SetSearchsTerm | ClearSearchsTerm;
