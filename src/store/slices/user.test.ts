import {userActions, userSlice} from './user.ts';
import {AuthorizationStatus, RequestStatus} from '../../const.ts';
import {User} from '../../types/user.ts';
import {makeFakeLoginData, makeFakeUser} from '../../utils/mocks.ts';

describe('User Slice', () => {

  const {checkAuthAction, loginAction, logoutAction, setUser} = userActions;

  const mockLoginData = makeFakeLoginData();
  const mockUser = makeFakeUser();
  const initialUser: User = {
    'name' : '',
    'email' : '',
    'avatarUrl' : '',
    'isPro' : false,
    'token' : '',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Idle
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Idle
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Unknown" (Unknown), "user" to "initialUser" (Idle), "requestStatus" to "1" (Loading) with "checkAuthAction.pending"', () => {
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Loading
    };

    const result = userSlice.reducer(undefined, checkAuthAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2" (Success), "posting" to "0" (Idle), "user" to "mockUser"  with "checkAuthAction.fulfilled"', () => {
    const initialState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Loading
    };

    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      requestStatus: RequestStatus.Success
    };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "checkAuthAction.rejected', () => {
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Failed
    };

    const result = userSlice.reducer(undefined, checkAuthAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Unknown" (Unknown), "user" to "initialUser" (Idle), "requestStatus" to "1" (Loading) with "loginAction.pending"', () => {
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Loading
    };

    const result = userSlice.reducer(undefined, loginAction.pending('', mockLoginData));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2" (Success), "posting" to "0" (Idle), "user" to "mockUser"  with "loginAction.fulfilled"', () => {
    const initialState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Loading
    };

    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      requestStatus: RequestStatus.Success
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(mockUser, '', mockLoginData));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "loginAction.rejected', () => {
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: initialUser,
      requestStatus: RequestStatus.Failed
    };

    const result = userSlice.reducer(undefined, loginAction.rejected(null, '', mockLoginData));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2" (Success), "posting" to "0" (Idle), "user" to "initialUser"  with "logoutAction.fulfilled"', () => {
    const initialState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      requestStatus: RequestStatus.Idle
    };

    const expectedState = {
      status: AuthorizationStatus.NoAuth,
      user: initialUser,
      requestStatus: RequestStatus.Idle
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled(undefined , '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to activeUser with "setUser"', () => {

    const expectedState = {
      status: AuthorizationStatus.NoAuth,
      user: mockUser,
      requestStatus: RequestStatus.Idle
    };

    const result = userSlice.reducer(expectedState, setUser(mockUser));

    expect(result).toEqual(expectedState);
  });

});
