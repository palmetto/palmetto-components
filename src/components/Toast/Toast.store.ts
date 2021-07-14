import { useState, useEffect } from 'react';
import { Toast, ExtendedToastOptions, ToastType } from './Toast.types';

const TOAST_LIMIT = 10;

// eslint-disable-next-line no-shadow
export enum ToastStoreActionType {
  ADD_TOAST = 'TOAST/ADD_TOAST',
  UPDATE_TOAST = 'TOAST/UPDATE_TOAST',
  UPSERT_TOAST = 'TOAST/UPSERT_TOAST',
  DISMISS_TOAST = 'TOAST/DISMISS_TOAST',
  REMOVE_TOAST = 'TOAST/REMOVE_TOAST',
  START_PAUSE = 'TOAST/START_PAUSE',
  END_PAUSE = 'TOAST/END_PAUSE',
}

type GenericAction<TActionType extends PropertyKey, TPayload extends Record<string, unknown>> = {
  type: TActionType;
  payload: TPayload;
}

type ToastStoreAction =
  | GenericAction<ToastStoreActionType.ADD_TOAST, { toast: Toast; }>
  | GenericAction<ToastStoreActionType.UPSERT_TOAST, { toast: Toast; }>
  | GenericAction<ToastStoreActionType.UPDATE_TOAST, { toast: Partial<Toast>; }>
  | GenericAction<ToastStoreActionType.DISMISS_TOAST, { toastId?: string; }>
  | GenericAction<ToastStoreActionType.REMOVE_TOAST, { toastId?: string; }>
  | GenericAction<ToastStoreActionType.START_PAUSE, { time: number; }>
  | GenericAction<ToastStoreActionType.END_PAUSE, { time: number; }>

interface ToastState {
  toasts: Toast[];
  pausedAt: number | undefined;
}

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

const addToDismissedQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ // eslint-disable-line
      type: ToastStoreActionType.REMOVE_TOAST,
      payload: { toastId },
    });
  }, 1000);

  toastTimeouts.set(toastId, timeout);
};

const clearFromDismissedQueue = (toastId: string) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};

type ReducerCallback<TState, TAction> = (state: TState, action: TAction) => TState;
type HandlerMap<
  TActionTypes extends PropertyKey,
  TAction extends GenericAction<TActionTypes, Record<string, unknown>>,
  TState
> = {
  [action in TActionTypes]: ReducerCallback<TState, TAction>
};
type ToastStoreHandlerMap = HandlerMap<ToastStoreActionType, ToastStoreAction, ToastState>

const createReducer = <
  TActionTypes extends PropertyKey,
  TAction extends GenericAction<TActionTypes, Record<string, unknown>>,
  TState,
  THandlers extends HandlerMap<TActionTypes, TAction, TState>,
>
  (
    initialState: TState,
    handlers: THandlers,
  ) => ((state: TState = initialState, action: TAction) => {
    if (handlers.hasOwnProperty(action.type)) { // eslint-disable-line
      return handlers[action.type](state, action);
    }

    return state;
  });

type ToastStoreHandler = ReducerCallback<ToastState, ToastStoreAction>;

const handleAddToast: ToastStoreHandler = (state, action) => {
  if (!('toast' in action.payload)) return state;

  const { toast } = action.payload;

  return {
    ...state,
    toasts: [toast as Toast, ...state.toasts].slice(0, TOAST_LIMIT),
  };
};

const handleUpdateToast: ToastStoreHandler = (state, action) => {
  if (!('toast' in action.payload)) return state;

  const { toast } = action.payload;

  //  ! Side effects !
  if (toast.id) {
    clearFromDismissedQueue(toast.id);
  }

  return {
    ...state,
    toasts: state.toasts.map(t => t.id === toast.id ? { ...t, ...toast } : t), // eslint-disable-line
  };
};

const handleUpsertToast: ToastStoreHandler = (state, action) => {
  if (!('toast' in action.payload)) return state;

  const { toast } = action.payload;

  // @TODO -- refactor to avoid using recursive function before 'reducer is declared'
  return state.toasts.find(t => t.id === toast.id)
    ? reducer(state, { type: ToastStoreActionType.UPDATE_TOAST, payload: { toast } }) // eslint-disable-line
    : reducer(state, { type: ToastStoreActionType.ADD_TOAST, payload: { toast } as { toast: Toast; } }); // eslint-disable-line
};

const handleDismissToast: ToastStoreHandler = (state, action) => {
  if (!('toastId' in action.payload)) return state;

  const { toastId } = action.payload;

  if (toastId) {
    addToDismissedQueue(toastId);
  } else {
    state.toasts.forEach(toast => {
      addToDismissedQueue(toast.id);
    });
  }

  return {
    ...state,
    // eslint-disable-next-line no-confusing-arrow
    toasts: state.toasts.map(t => t.id === toastId || toastId === undefined ? { ...t, visible: false } : t),
  };
};

const handleRemoveToast: ToastStoreHandler = (state, action) => {
  if (!('toastId' in action.payload)) return state;

  const { toastId } = action.payload;

  if (toastId === undefined) {
    return {
      ...state,
      toasts: [],
    };
  }

  return {
    ...state,
    toasts: state.toasts.filter(t => t.id !== toastId),
  };
};

const handleStartPause: ToastStoreHandler = (state, action) => {
  if (!('time' in action.payload)) return state;

  return {
    ...state,
    pausedAt: action.payload.time,
  };
};

const handleEndPause: ToastStoreHandler = (state, action) => {
  if (!('time' in action.payload)) return state;

  const diff = action.payload.time - (state.pausedAt || 0);

  return {
    ...state,
    pausedAt: undefined,
    toasts: state.toasts.map(t => ({
      ...t,
      pauseDuration: t.pauseDuration + diff,
    })),
  };
};

const actionHandlers: ToastStoreHandlerMap = {
  [ToastStoreActionType.ADD_TOAST]: handleAddToast,
  [ToastStoreActionType.UPDATE_TOAST]: handleUpdateToast,
  [ToastStoreActionType.UPSERT_TOAST]: handleUpsertToast,
  [ToastStoreActionType.DISMISS_TOAST]: handleDismissToast,
  [ToastStoreActionType.REMOVE_TOAST]: handleRemoveToast,
  [ToastStoreActionType.START_PAUSE]: handleStartPause,
  [ToastStoreActionType.END_PAUSE]: handleEndPause,
};

const toastReducer = createReducer<
  ToastStoreActionType,
  ToastStoreAction,
  ToastState,
  ToastStoreHandlerMap
>(
  { toasts: [], pausedAt: undefined },
  actionHandlers,
);

const reducer = (state: ToastState, action: ToastStoreAction) => toastReducer(state, action);

const listeners: Array<(state: ToastState) => void> = [];

let memoryState: ToastState = { toasts: [], pausedAt: undefined };

export const dispatch = (action: ToastStoreAction): void => {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
};

const defaultTimeouts: {
  [key in ToastType]: number;
} = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: Infinity,
  custom: 4000,
};

export const useToastStore = (toastOptions: ExtendedToastOptions = {}): ToastState => {
  const [state, setState] = useState<ToastState>(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const mergedToasts = state.toasts.map(t => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration:
      t.duration
      || toastOptions[t.type]?.duration
      || toastOptions?.duration
      || defaultTimeouts[t.type],
    style: {
      ...toastOptions.style,
      ...toastOptions[t.type]?.style,
      ...t.style,
    },
  }));

  return {
    ...state,
    toasts: mergedToasts,
  };
};
