import userReducer, {
  setUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  logoutUser
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    passwordResetRequested: false,
    passwordResetCompleted: false
  };

  const user = {
    email: 'test@test.com',
    name: 'Test User'
  };

  it('должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('setUser: user и isAuthenticated обновляются', () => {
    const action = { type: setUser.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('setUser: user=null, isAuthenticated=false', () => {
    const action = { type: setUser.type, payload: null };
    const state = userReducer({ ...initialState, user }, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('pending registerUser: loading=true, error=null', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled registerUser: user, isAuthenticated обновляются, loading=false', () => {
    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('rejected registerUser: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: registerUser.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('pending loginUser: loading=true, error=null', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled loginUser: user, isAuthenticated обновляются, loading=false', () => {
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('rejected loginUser: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: loginUser.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('pending forgotPassword: loading=true, error=null, passwordResetRequested=false', () => {
    const action = { type: forgotPassword.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.passwordResetRequested).toBe(false);
  });

  it('fulfilled forgotPassword: passwordResetRequested=true, loading=false', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.passwordResetRequested).toBe(true);
  });

  it('rejected forgotPassword: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: forgotPassword.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('pending resetPassword: loading=true, error=null, passwordResetCompleted=false', () => {
    const action = { type: resetPassword.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.passwordResetCompleted).toBe(false);
  });

  it('fulfilled resetPassword: passwordResetCompleted=true, loading=false', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.passwordResetCompleted).toBe(true);
  });

  it('rejected resetPassword: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: resetPassword.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('pending getProfile: loading=true, error=null', () => {
    const action = { type: getProfile.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled getProfile: user, isAuthenticated обновляются, loading=false', () => {
    const action = { type: getProfile.fulfilled.type, payload: user };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('rejected getProfile: error=payload, loading=false, isAuthenticated=false', () => {
    const error = new Error('Ошибка');
    const action = { type: getProfile.rejected.type, payload: error };
    const state = userReducer(
      { ...initialState, loading: true, isAuthenticated: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthenticated).toBe(false);
  });

  it('pending updateProfile: loading=true, error=null', () => {
    const action = { type: updateProfile.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled updateProfile: user обновляется, loading=false', () => {
    const action = { type: updateProfile.fulfilled.type, payload: user };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
  });

  it('rejected updateProfile: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: updateProfile.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('pending logoutUser: loading=true, error=null', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled logoutUser: user=null, isAuthenticated=false, loading=false', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(
      { ...initialState, loading: true, user, isAuthenticated: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('rejected logoutUser: error=payload, loading=false', () => {
    const error = new Error('Ошибка');
    const action = { type: logoutUser.rejected.type, payload: error };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
