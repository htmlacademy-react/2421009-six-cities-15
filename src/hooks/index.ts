import {useMemo} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';
import type {ActionCreatorsMapObject, AsyncThunk} from '@reduxjs/toolkit';
import {bindActionCreators, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key];
}

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (...args:Parameters<Thunk>) =>
  ReturnType<ReturnType<Thunk>>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: AxiosInstance;
}>();
