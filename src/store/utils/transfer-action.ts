import { ofType } from 'redux-observable';
import { PayloadMetaAction } from 'typesafe-actions';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootActions } from '../index';

export function transferActionEpicFactory<InputAction extends PayloadMetaAction<any, any, any>, OutputAction>(
  inputActionType: string,
  outputActionCreator: (payload: any, meta?: any) => OutputAction,
) {
  return (action$: Observable<RootActions>) =>
    action$.pipe(
      ofType(inputActionType),
      map(({ payload, meta }: InputAction) => outputActionCreator(payload, meta)),
    );
}