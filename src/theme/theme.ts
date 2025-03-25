import { ThemeType } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { dark } from 'grommet/themes';

export const accentColor = '#7D4CDB';

export const customTheme: ThemeType = deepMerge(dark, {
  global: {
    colors: {
      background: '#121212',
      'background-back': '#1E1E1E',
      'background-front': '#2D2D2D',
      'background-contrast': '#3D3D3D',
      text: '#EEEEEE',
      'text-strong': '#FFFFFF',
      'dark-6': '#999999',
      'dark-5': '#BBBBBB',
      'accent-1': accentColor,
      brand: accentColor
    },
    focus: {
      border: {
        color: accentColor
      }
    }
  },
  button: {
    border: {
      radius: '4px'
    },
    primary: {
      color: accentColor
    }
  },
  checkBox: {
    hover: {
      border: {
        color: accentColor
      }
    },
    color: accentColor
  }
});
