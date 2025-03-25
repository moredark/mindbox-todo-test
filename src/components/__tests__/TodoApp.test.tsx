import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoApp } from '../TodoApp';
import { useTodos } from '../../hooks/useTodos';
import { useSettings } from '../../hooks/useSettings';
import { useAutoDeleteCompleted } from '../../hooks/useAutoDeleteCompleted';
import { Grommet } from 'grommet';

jest.mock('../../hooks/useTodos');
jest.mock('../../hooks/useSettings');
jest.mock('../../hooks/useAutoDeleteCompleted');

jest.useFakeTimers();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Grommet>
    {children}
  </Grommet>
);

describe('TodoApp', () => {
  const mockTodos = [
    { id: '1', text: 'Test todo 1', completed: false, createdAt: new Date() },
    { id: '2', text: 'Test todo 2', completed: true, createdAt: new Date() }
  ];

  const mockUseTodos = {
    todos: mockTodos,
    filteredTodos: mockTodos,
    filter: 'all',
    activeTodoCount: 1,
    setFilter: jest.fn(),
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
    clearCompleted: jest.fn()
  };

  const mockSettings = {
    settings: { autoDeleteCompleted: false },
    toggleAutoDeleteCompleted: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTodos as jest.Mock).mockReturnValue(mockUseTodos);
    (useSettings as jest.Mock).mockReturnValue(mockSettings);
    (useAutoDeleteCompleted as jest.Mock).mockImplementation(() => {});
  });

  test('should render TodoApp with all components', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('Todo app')).toBeInTheDocument();
  });

  test('should handle adding new todo', () => {
    render(<TodoApp />, { wrapper: TestWrapper });
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockUseTodos.addTodo).toHaveBeenCalledWith('New todo');
  });

  test('should handle toggling todo', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const toggleButton = screen.getByTestId('todo-checkbox-1');
    fireEvent.click(toggleButton);

    expect(mockUseTodos.toggleTodo).toHaveBeenCalledWith('1');
  });

  test('should handle deleting todo', async () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const deleteButton = screen.getByTestId('todo-delete-1');
    fireEvent.click(deleteButton);
    
    jest.runAllTimers();
    
    await waitFor(() => {
      expect(mockUseTodos.deleteTodo).toHaveBeenCalledWith('1');
    });
  });

  test('should handle filter change', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const activeFilterButton = screen.getByTestId('filter-active');
    fireEvent.click(activeFilterButton);

    expect(mockUseTodos.setFilter).toHaveBeenCalledWith('active');
  });

  test('should handle clearing completed todos', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const clearButton = screen.getByTestId('clear-completed');
    fireEvent.click(clearButton);

    expect(mockUseTodos.clearCompleted).toHaveBeenCalled();
  });

  test('should handle toggling auto-delete setting', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);

    const autoDeleteToggle = screen.getByTestId('auto-delete-setting');
    fireEvent.click(autoDeleteToggle);

    expect(mockSettings.toggleAutoDeleteCompleted).toHaveBeenCalled();
  });

  test('should show correct active todo count', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    const todoCount = screen.getByTestId('todo-count');
    expect(todoCount).toHaveTextContent('1 item left');
  });

  test('should show "All tasks completed" when no active tasks', () => {
    (useTodos as jest.Mock).mockReturnValue({
      ...mockUseTodos,
      activeTodoCount: 0
    });

    render(<TodoApp />, { wrapper: TestWrapper });

    const todoCount = screen.getByTestId('todo-count');
    expect(todoCount).toHaveTextContent('All tasks completed');
  });

  test('should handle empty state', () => {
    (useTodos as jest.Mock).mockReturnValue({
      ...mockUseTodos,
      todos: [],
      filteredTodos: [],
      activeTodoCount: 0
    });

    render(<TodoApp />, { wrapper: TestWrapper });

    expect(screen.getByText(/no tasks. add a new task!/i)).toBeInTheDocument();
  });

  test('should use auto-delete completed hook', () => {
    render(<TodoApp />, { wrapper: TestWrapper });

    expect(useAutoDeleteCompleted).toHaveBeenCalledWith(
      mockTodos,
      false,
      mockUseTodos.clearCompleted
    );
  });
});
