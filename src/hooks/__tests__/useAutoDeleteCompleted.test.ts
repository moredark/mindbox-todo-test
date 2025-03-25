import { renderHook } from '@testing-library/react';
import { useAutoDeleteCompleted } from '../useAutoDeleteCompleted';
import { AUTO_DELETE_TIMEOUT_MS } from '../../constants';
import { Todo } from '../../types';

describe('useAutoDeleteCompleted', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not call clearCompleted when auto-delete is disabled', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Test', completed: true, createdAt: new Date() }
    ];
    const clearCompleted = jest.fn();

    renderHook(() => useAutoDeleteCompleted(todos, false, clearCompleted));
    
    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS);
    expect(clearCompleted).not.toHaveBeenCalled();
  });

  it('should not call clearCompleted when no completed todos', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Test', completed: false, createdAt: new Date() }
    ];
    const clearCompleted = jest.fn();

    renderHook(() => useAutoDeleteCompleted(todos, true, clearCompleted));
    
    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS);
    expect(clearCompleted).not.toHaveBeenCalled();
  });

  it('should call clearCompleted after timeout when completed todos exist and auto-delete is enabled', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Test', completed: true, createdAt: new Date() }
    ];
    const clearCompleted = jest.fn();

    renderHook(() => useAutoDeleteCompleted(todos, true, clearCompleted));
    
    expect(clearCompleted).not.toHaveBeenCalled();
    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS);
    expect(clearCompleted).toHaveBeenCalledTimes(1);
  });

  it('should clear timer on unmount', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Test', completed: true, createdAt: new Date() }
    ];
    const clearCompleted = jest.fn();

    const { unmount } = renderHook(() => 
      useAutoDeleteCompleted(todos, true, clearCompleted)
    );

    unmount();
    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS);
    expect(clearCompleted).not.toHaveBeenCalled();
  });

  it('should reset timer on todos change', () => {
    const initialTodos: Todo[] = [
      { id: '1', text: 'Test', completed: false, createdAt: new Date() }
    ];
    const clearCompleted = jest.fn();

    const { rerender } = renderHook(
      ({ todos }) => useAutoDeleteCompleted(todos, true, clearCompleted),
      { initialProps: { todos: initialTodos } }
    );

    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS / 2);
    
    const updatedTodos: Todo[] = [
      { id: '1', text: 'Test', completed: true, createdAt: new Date() }
    ];
    rerender({ todos: updatedTodos });

    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS / 2);
    expect(clearCompleted).not.toHaveBeenCalled();

    jest.advanceTimersByTime(AUTO_DELETE_TIMEOUT_MS);
    expect(clearCompleted).toHaveBeenCalledTimes(1);
  });
});
