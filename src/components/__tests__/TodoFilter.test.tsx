import { render, screen, fireEvent } from '@testing-library/react';
import { Grommet } from 'grommet';
import { TodoFilter } from '../TodoFilter';
import { customTheme } from '../../theme/theme';
import { formatTaskCount } from '../../utils/formatters';
import { FilterType } from '../../types';

jest.mock('../../utils/formatters', () => ({
  formatTaskCount: jest.fn((count) => `${count} items left`)
}));

describe('TodoFilter', () => {
  const defaultProps = {
    activeFilter: 'all' as FilterType,
    activeCount: 3,
    onFilterChange: jest.fn(),
    onClearCompleted: jest.fn(),
    hasCompleted: true
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <Grommet theme={customTheme}>
        <TodoFilter {...props} />
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

  it('should display formatted task count', () => {
    renderComponent();
    expect(formatTaskCount).toHaveBeenCalledWith(3);
    expect(screen.getByTestId('todo-count')).toHaveTextContent('3 items left');
  });

  it('should call onFilterChange when filter button is clicked', () => {
    renderComponent();

    const activeButton = screen.getByTestId('filter-active');
    fireEvent.click(activeButton);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('active');
  });

  it('should enable clear completed button when hasCompleted is true', () => {
    renderComponent();

    const clearButton = screen.getByTestId('clear-completed');
    expect(clearButton).not.toBeDisabled();
  });

  it('should disable clear completed button when hasCompleted is false', () => {
    renderComponent({
      ...defaultProps,
      hasCompleted: false
    });

    const clearButton = screen.getByTestId('clear-completed');
    expect(clearButton).toBeDisabled();
  });

  it('should call onClearCompleted when clear button is clicked', () => {
    renderComponent();

    const clearButton = screen.getByTestId('clear-completed');
    fireEvent.click(clearButton);

    expect(defaultProps.onClearCompleted).toHaveBeenCalledTimes(1);
  });

  describe('filter buttons', () => {
    it.each([
      ['all', 'filter-all'],
      ['active', 'filter-active'],
      ['completed', 'filter-completed']
    ] as const)('should handle %s filter click', (filter, testId) => {
      renderComponent();

      const button = screen.getByTestId(testId);
      fireEvent.click(button);

      expect(defaultProps.onFilterChange).toHaveBeenCalledWith(filter);
    });
  });
});
