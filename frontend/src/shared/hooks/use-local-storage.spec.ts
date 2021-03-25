import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useLocalStorage from './use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '0');
    Storage.prototype.setItem = jest.fn(() => undefined);
  });

  it('should store the initial value', () => {
    Storage.prototype.getItem = jest.fn(() => null);

    const { current } = renderHook(() => useLocalStorage('value', 0)).result;
    const [value] = current;

    expect(value).toBe(0);
  });

  it('should set the value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('value', 0));

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('value', '2');
  });

  it('should set the value to localStorage when the transform function is passed', () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const { result } = renderHook(() => useLocalStorage('value', 10));

    act(() => {
      result.current[1]((value: number) => value + 10);
    });

    expect(result.current[0]).toBe(20);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('value', '20');
  });

  it('should get the value from localStorage', () => {
    const { current } = renderHook(() => useLocalStorage('value', 0)).result;
    const [value] = current;

    expect(value).toBe(0);
  });
});
