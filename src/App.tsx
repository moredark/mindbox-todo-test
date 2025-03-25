import React from 'react';
import { Grommet, Box } from 'grommet';
import { TodoApp } from './components/TodoApp';
import { customTheme } from './theme/theme';

const App: React.FC = () => {
  return (
    <Grommet theme={customTheme} full themeMode="dark">
      <Box
        align="center"
        justify="center"
        pad="medium"
        background="background"
        fill
      >
        <TodoApp />
      </Box>
    </Grommet>
  );
};

export default App;
