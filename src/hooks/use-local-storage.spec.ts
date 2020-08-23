import { act, renderHook } from '@testing-library/react-hooks';

import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  const KEY = 'fakeKey';
  const VALUE = JSON.stringify({ value: 'fake value' });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SHOULD set value with given key', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, undefined));
    const [, setValue] = result.current;

    act(() => setValue(VALUE));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      KEY,
      JSON.stringify(VALUE)
    );
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(VALUE));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});
