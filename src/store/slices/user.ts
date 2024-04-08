import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthorizationStatus, RequestStatus, StoreSlices} from '../../const.ts';
import {User} from '../../types/user.ts';
import {checkAuthAction, loginAction, logoutAction} from '../thunks/auth.ts';

interface UserState {
  status: AuthorizationStatus;
  user: User;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  status: AuthorizationStatus.Unknown,
  user: {
    'name' : '',
    'email' : '',
    'avatarUrl' : '',
    'isPro' : false,
    'token' : '',
  },
  requestStatus: RequestStatus.Idle
};

function proccessSuccess(state: UserState, action:PayloadAction<User>) {
  state.user = action.payload;
  state.status = AuthorizationStatus.Auth;
  state.requestStatus = RequestStatus.Success;
}
function proccessLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}
function proccessFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
}

const userSlice = createSlice({
  initialState,
  name: StoreSlices.User,
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, proccessLoading)
      .addCase(checkAuthAction.fulfilled, proccessSuccess)
      .addCase(checkAuthAction.rejected, proccessFailed)
      .addCase(loginAction.pending, proccessLoading)
      .addCase(loginAction.fulfilled, proccessSuccess)
      .addCase(loginAction.rejected, proccessFailed)
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = initialState.user;
        state.status = AuthorizationStatus.NoAuth;
      });
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    status: (state:UserState) => state.status,
    user: (state:UserState) => state.user,
  }
});

const userActions = {...userSlice.actions, checkAuthAction, loginAction, logoutAction};

const userSelectors = {
  ...userSlice.selectors,
  isAuth: createSelector(userSlice.selectors.status, (status) => status === AuthorizationStatus.Auth)
};

export {userActions, userSlice, userSelectors};
