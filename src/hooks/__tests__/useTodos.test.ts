import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with an empty todo list', () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([]);
    expect(result.current.filteredTodos).toEqual([]);
    expect(result.current.activeTodoCount).toBe(0);
    expect(result.current.filter).toBe('all');
  });

  test('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
    expect(result.current.todos[0].completed).toBe(false);
  });

  test('should not add an empty todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('   ');
    });

    expect(result.current.todos).toHaveLength(0);
  });

  test('should toggle a todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  test('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  test('should clear completed todos', async () => {
    const { result } = renderHook(() => useTodos());

    await act(async () => {
      result.current.addTodo('Task 1');
    });

    await act(async () => {
      result.current.addTodo('Task 2');
    });

    const firstTodoId = result.current.todos[0].id;

    await act(async () => {
      result.current.toggleTodo(firstTodoId);
    });

    await act(async () => {
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Task 2');
  });

  test('should save todos to localStorage', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Test todo');
    });

    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    expect(storedTodos).toHaveLength(1);
    expect(storedTodos[0].text).toBe('Test todo');
  });

  test('should load todos from localStorage', () => {
    const testTodo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('todos', JSON.stringify([testTodo]));

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
  });
});
