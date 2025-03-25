import React, { useState, useRef } from 'react';
import { Box, Button, CheckBox, Drop, Text, Heading } from 'grommet';
import { Configure } from 'grommet-icons';
import { TodoSettings as TodoSettingsType } from '../types';

interface TodoSettingsProps {
  settings: TodoSettingsType;
  onToggleAutoDelete: () => void;
}

export const TodoSettings: React.FC<TodoSettingsProps> = ({ settings, onToggleAutoDelete }) => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsButtonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  return (
    <Box>
      <Button
        ref={settingsButtonRef}
        icon={<Configure color="text-strong" />}
        onClick={() => setShowSettings(!showSettings)}
        data-testid="settings-button"
      />

      {showSettings && settingsButtonRef.current && (
        <Drop
          target={settingsButtonRef.current}
          align={{ top: 'bottom', right: 'right' }}
          onClickOutside={() => setShowSettings(false)}
          onEsc={() => setShowSettings(false)}
          elevation="none"
        >
          <Box
            pad="medium"
            gap="small"
            width={{ min: '300px' }}
            data-testid="settings-panel"
            background="background-front"
            border={{ color: 'dark-3', size: '1px' }}
            round="small"
          >
            <Heading level={3} margin="none" size="small" color="text-strong">
              Settings
            </Heading>

            <Box margin={{ top: 'small' }}>
              <CheckBox
                label="Automatically delete completed tasks"
                checked={settings.autoDeleteCompleted}
                onChange={onToggleAutoDelete}
                data-testid="auto-delete-setting"
              />
              <Text
                size="small"
                color="dark-5"
                margin={{ top: 'xsmall' }}
              >
                When enabled, completed tasks will be automatically removed
              </Text>
            </Box>
          </Box>
        </Drop>
      )}
    </Box>
  );
};
