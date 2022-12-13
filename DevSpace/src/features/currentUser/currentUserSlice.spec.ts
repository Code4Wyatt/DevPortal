import currentUserReducer, {
  addUser,
  CurrentUserState,
  removeUser,
} from './currentUserSlice';

describe('current user reducer', () => {
  const initialState: CurrentUserState = {
    user: [],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(currentUserReducer(undefined, { type: 'unknown' })).toEqual({
      user: [],
      status: 'idle',
    });
  });

  // it('should add user', () => {
  //   const actual = currentUserReducer(initialState, addUser());
  //   expect(actual.user).toEqual(4);
  // });

  // it('should handle decrement', () => {
  //   const actual = currentUserReducer(initialState, decrement());
  //   expect(actual.user).toEqual(2);
  // });

  // it('should handle incrementByAmount', () => {
  //   const actual = currentUserReducer(initialState, incrementByAmount(2));
  //   expect(actual.user).toEqual(5);
  // });
});
