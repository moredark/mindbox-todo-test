import { render, screen, fireEvent } from '@testing-library/react';
import { Grommet } from 'grommet';
import { TodoInput } from '../TodoInput';
import { customTheme } from '../../theme/theme';

describe('TodoInput', () => {
  const defaultProps = {
    onAddTodo: jest.fn()
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <Grommet theme={customTheme}>
        <TodoInput {...props} />
      </Grommet>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should update input value when typing', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');

    fireEvent.change(input, { target: { value: 'New todo' } });

    expect(input).toHaveValue('New todo');
  });

  it('should clear input after submitting valid text', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('todo-form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    expect(input).toHaveValue('');
    expect(defaultProps.onAddTodo).toHaveBeenCalledWith('New todo');
  });

  it('should not call onAddTodo when submitting empty text', () => {
    renderComponent();
    const form = screen.getByTestId('todo-form');

    fireEvent.submit(form);

    expect(defaultProps.onAddTodo).not.toHaveBeenCalled();
  });

  it('should not call onAddTodo when submitting whitespace', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('todo-form');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    expect(defaultProps.onAddTodo).not.toHaveBeenCalled();
  });

  it('should trim text before adding todo', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('todo-form');

    fireEvent.change(input, { target: { value: '  New todo  ' } });
    fireEvent.submit(form);

    expect(defaultProps.onAddTodo).toHaveBeenCalledWith('New todo');
  });

  it('should add todo on Enter key press with valid text', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input).toHaveValue('');
    expect(defaultProps.onAddTodo).toHaveBeenCalledWith('New todo');
  });

  it('should not add todo on Enter key press with invalid text', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');

    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(defaultProps.onAddTodo).not.toHaveBeenCalled();
  });

  it('should disable submit button when text is empty', () => {
    renderComponent();
    const submitButton = screen.getByTestId('todo-submit');

    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when text is valid', () => {
    renderComponent();
    const input = screen.getByTestId('todo-input');
    const submitButton = screen.getByTestId('todo-submit');

    fireEvent.change(input, { target: { value: 'New todo' } });

    expect(submitButton).not.toBeDisabled();
  });
});
