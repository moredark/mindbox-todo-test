import React, { useState, useCallback, useMemo } from 'react';
import { Box, TextInput, Button } from 'grommet';
import { Add } from 'grommet-icons';
import { TodoInputProps } from './types';

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const isValidText = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isValidText(text)) {
      onAddTodo(text.trim());
      setText('');
    }
  }, [text, onAddTodo]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidText(text)) {
      onAddTodo(text.trim());
      setText('');
    }
  }, [text, onAddTodo]);

  const isValid = useMemo(() => isValidText(text), [text]);

  return (
    <Box
      as="form"
      direction="row"
      align="center"
      gap="small"
      margin={{ vertical: 'medium' }}
      onSubmit={handleSubmit}
      data-testid="todo-form"
    >
      <TextInput
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        data-testid="todo-input"
        color="text"
      />
      <Button
        icon={<Add color="light-1" />}
        type="submit"
        disabled={!isValid}
        primary
        data-testid="todo-submit"
      />
    </Box>
  );
};
