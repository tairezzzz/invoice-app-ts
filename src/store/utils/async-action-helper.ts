import { Observable, of, pipe } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

interface Action<TType extends string = string> {
  type: TType;
}

interface PayloadAction<PType, TType extends string = string> extends Action<TType> {
  payload: PType;
}

interface PayloadMetaAction<PType, TType extends string = string, MType extends string = string>
  extends PayloadAction<PType, TType> {
  meta: MType;
}

export enum AsyncActionStatus {
  Succeeded,
  Failed,
  Canceled,
  Pending,
  Initial,
}

export interface AsyncActionState {
  loading: boolean;
  loaded: boolean;
  status: AsyncActionStatus;
  data?: any;
}

export const asyncActionInitialState: AsyncActionState = {
  loading: false,
  loaded: false,
  status: AsyncActionStatus.Initial,
  data: null,
};

export function asyncActionHandlerFactory<PayloadType, ReturnedType, ErrorType>(
  type: string,
  concurrencyType?: ConcurrencyType,
) {
  const { Actions, ActionTypes } = createActions<PayloadType, ReturnedType, ErrorType, any>(type);

  // e.g. mergeMap, switchMap, concatMap;
  const concurrencyOperator: any = getConcurrencyOperator(concurrencyType);

  const effect = (action$: Observable<Action>, requestFn: (payload: PayloadType) => Observable<ReturnedType>) =>
    action$.pipe(
      filter((action: Action) => action.type === ActionTypes.ACTION),
      concurrencyOperator((action: PayloadMetaAction<PayloadType>) =>
        requestFn(action.payload).pipe(
          map((response) => Actions.success(response, action.meta)),
          catchError(
            pipe(
              (error) => Actions.failure(error, action.meta),
              of,
            ),
          ),
          takeUntil(action$.pipe(filter((cancelAction: Action) => cancelAction.type === ActionTypes.ACTION_CANCELED))),
        ),
      ),
    );

  const reducer = (
    state: AsyncActionState = asyncActionInitialState,
    action: PayloadAction<ReturnedType | ErrorType>,
  ): AsyncActionState => {
    switch (action.type) {
      case ActionTypes.ACTION:
        return {
          ...state,
          loading: true,
          loaded: false,
          status: AsyncActionStatus.Pending,
          data: null,
        };

      case ActionTypes.ACTION_SUCCEEDED:
        return {
          ...state,
          loading: false,
          loaded: true,
          status: AsyncActionStatus.Succeeded,
          data: action.payload,
        };

      case ActionTypes.ACTION_FAILED:
        return {
          ...state,
          loading: false,
          loaded: false,
          status: AsyncActionStatus.Failed,
          data: action.payload,
        };

      case ActionTypes.ACTION_CANCELED:
        return {
          ...state,
          loading: false,
          loaded: false,
          status: AsyncActionStatus.Canceled,
        };

      default:
        return state;
    }
  };

  return { ActionTypes, Actions, effect, reducer };
}

type ConcurrencyType = 'merge' | 'switch' | 'concat';

type ConcurrencyOperator = typeof mergeMap | typeof switchMap | typeof concatMap;

function getConcurrencyOperator(type?: ConcurrencyType): ConcurrencyOperator {
  switch (type) {
    case 'concat': {
      return concatMap;
    }
    case 'merge': {
      return mergeMap;
    }
    case 'switch': {
      return switchMap;
    }
    default: {
      return mergeMap;
    }
  }
}

function createActions<PayloadType, ReturnedType, ErrorType, CancelType>(type: string) {
  const ActionTypes = {
    ACTION: `${type}`,
    ACTION_SUCCEEDED: `${type}_SUCCEEDED`,
    ACTION_FAILED: `${type}_FAILED`,
    ACTION_CANCELED: `${type}_CANCELED`,
  };

  const Actions = {
    action: <P>(payload?: P, meta?: string) => ({ type: ActionTypes.ACTION, payload, meta }),
    success: <P>(payload: P, meta?: string) => ({ type: ActionTypes.ACTION_SUCCEEDED, payload, meta }),
    failure: <P>(payload: P, meta?: string) => ({ type: ActionTypes.ACTION_FAILED, payload, meta }),
    cancel: <P>(payload?: P, meta?: string) => ({ type: ActionTypes.ACTION_CANCELED, payload, meta }),
  };

  return { ActionTypes, Actions };
}