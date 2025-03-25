import { render, screen, fireEvent } from '@testing-library/react';
import { Grommet } from 'grommet';
import { TodoSettings } from '../TodoSettings';
import { customTheme } from '../../theme/theme';

describe('TodoSettings', () => {
  const defaultProps = {
    settings: {
      autoDeleteCompleted: false
    },
    onToggleAutoDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = defaultProps) => {
    return render(
      <Grommet theme={customTheme} full>
        <TodoSettings {...props} />
      </Grommet>
    );
  };

  it('should match snapshot with settings closed', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with settings open', () => {
    renderComponent();
    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    
    const settingsPanel = screen.getByTestId('settings-panel');
    expect(settingsPanel).toBeInTheDocument();
    expect(settingsPanel).toMatchSnapshot();
  });

  it('should toggle settings panel on button click', () => {
    renderComponent();
    const settingsButton = screen.getByTestId('settings-button');

    fireEvent.click(settingsButton);
    expect(screen.getByTestId('settings-panel')).toBeInTheDocument();

    fireEvent.click(settingsButton);
    expect(screen.queryByTestId('settings-panel')).not.toBeInTheDocument();
  });

  it('should call onToggleAutoDelete when checkbox is clicked', () => {
    renderComponent();
    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);

    const checkbox = screen.getByTestId('auto-delete-setting');
    fireEvent.click(checkbox);

    expect(defaultProps.onToggleAutoDelete).toHaveBeenCalledTimes(1);
  });

  it('should show correct checkbox state', () => {
    renderComponent({
      settings: {
        autoDeleteCompleted: true
      },
      onToggleAutoDelete: defaultProps.onToggleAutoDelete
    });

    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);

    const checkbox = screen.getByTestId('auto-delete-setting');
    expect(checkbox).toBeChecked();
  });
});
