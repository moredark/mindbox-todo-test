import { renderHook, act } from '@testing-library/react';
import { useSettings } from '../useSettings';

describe('useSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default settings if localStorage is empty', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings).toEqual({
      autoDeleteCompleted: false
    });
  });

  it('should load settings from localStorage', () => {
    const testSettings = {
      autoDeleteCompleted: true
    };
    localStorage.setItem('mindbox-todo-settings', JSON.stringify(testSettings));

    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings).toEqual(testSettings);
  });

  it('should update settings', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.updateSettings({ autoDeleteCompleted: true });
    });

    expect(result.current.settings.autoDeleteCompleted).toBe(true);
    expect(JSON.parse(localStorage.getItem('mindbox-todo-settings') || '{}')).toEqual({
      autoDeleteCompleted: true
    });
  });

  it('should toggle autoDeleteCompleted setting', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toggleAutoDeleteCompleted();
    });

    expect(result.current.settings.autoDeleteCompleted).toBe(true);

    act(() => {
      result.current.toggleAutoDeleteCompleted();
    });

    expect(result.current.settings.autoDeleteCompleted).toBe(false);
  });

  it('should return default settings on localStorage parsing error', () => {
    localStorage.setItem('mindbox-todo-settings', 'invalid json');

    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings).toEqual({
      autoDeleteCompleted: false
    });
  });
});
