describe('loading store', () => {
  it('shows', () => {
    const initialState = {show: false};
    const newState = loadingReducer(initialState, show);

    expect(newState).toEqual({show: true});
  });
});
