import { render, screen, fireEvent } from '@testing-library/react';
import { Grommet } from 'grommet';
import { TodoItem } from '../TodoItem';
import { customTheme } from '../../theme/theme';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date('2024-01-01')
  };

  const defaultProps = {
    todo: mockTodo,
    onToggle: jest.fn(),
    onDelete: jest.fn()
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <Grommet theme={customTheme}>
        <TodoItem {...props} />
      </Grommet>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot for incomplete todo', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for completed todo', () => {
    const { container } = renderComponent({
      ...defaultProps,
      todo: { ...mockTodo, completed: true }
    });
    expect(container).toMatchSnapshot();
  });

  it('should call onToggle when checkbox is clicked', () => {
    renderComponent();
    const checkbox = screen.getByTestId(`todo-checkbox-${mockTodo.id}`);
    
    fireEvent.click(checkbox);
    
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should call onDelete when delete button is clicked', () => {
    renderComponent();
    const deleteButton = screen.getByTestId(`todo-delete-${mockTodo.id}`);
    
    fireEvent.click(deleteButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should display todo text', () => {
    renderComponent();
    const todoText = screen.getByTestId(`todo-text-${mockTodo.id}`);
    expect(todoText).toHaveTextContent(mockTodo.text);
  });

  it('should apply completed styles when todo is completed', () => {
    renderComponent({
      ...defaultProps,
      todo: { ...mockTodo, completed: true }
    });
    
    const todoText = screen.getByTestId(`todo-text-${mockTodo.id}`);
    expect(todoText).toHaveStyle({
      textDecoration: 'line-through',
      opacity: '0.7'
    });
  });

  it('should apply normal styles when todo is not completed', () => {
    renderComponent();
    
    const todoText = screen.getByTestId(`todo-text-${mockTodo.id}`);
    expect(todoText).toHaveStyle({
      textDecoration: 'none',
      opacity: '1'
    });
  });
});
