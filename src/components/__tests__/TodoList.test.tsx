import { render, screen, fireEvent } from '@testing-library/react';
import { Grommet } from 'grommet';
import { TodoList } from '../TodoList';
import { customTheme } from '../../theme/theme';

describe('TodoList', () => {
  const mockTodos = [
    {
      id: '1',
      text: 'Test todo 1',
      completed: false,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      text: 'Test todo 2',
      completed: true,
      createdAt: new Date('2024-01-02')
    }
  ];

  const defaultProps = {
    todos: mockTodos,
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
    isEmpty: false
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <Grommet theme={customTheme}>
        <TodoList {...props} />
      </Grommet>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with todos', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when empty', () => {
    const { container } = renderComponent({
      ...defaultProps,
      todos: [],
      isEmpty: true
    });
    expect(container).toMatchSnapshot();
  });

  it('should display empty state message when isEmpty is true', () => {
    renderComponent({
      ...defaultProps,
      todos: [],
      isEmpty: true
    });

    expect(screen.getByText('No tasks. Add a new task!')).toBeInTheDocument();
  });

  it('should render all todos', () => {
    renderComponent();

    mockTodos.forEach(todo => {
      expect(screen.getByTestId(`todo-text-${todo.id}`)).toHaveTextContent(todo.text);
    });
  });

  it('should call toggleTodo when todo checkbox is clicked', () => {
    renderComponent();

    const checkbox = screen.getByTestId(`todo-checkbox-${mockTodos[0].id}`);
    fireEvent.click(checkbox);

    expect(defaultProps.toggleTodo).toHaveBeenCalledTimes(1);
    expect(defaultProps.toggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('should call deleteTodo when todo delete button is clicked', () => {
    renderComponent();

    const deleteButton = screen.getByTestId(`todo-delete-${mockTodos[0].id}`);
    fireEvent.click(deleteButton);

    expect(defaultProps.deleteTodo).toHaveBeenCalledTimes(1);
    expect(defaultProps.deleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('should not render todos when isEmpty is true', () => {
    renderComponent({
      ...defaultProps,
      isEmpty: true
    });

    mockTodos.forEach(todo => {
      expect(screen.queryByTestId(`todo-text-${todo.id}`)).not.toBeInTheDocument();
    });
  });
});
