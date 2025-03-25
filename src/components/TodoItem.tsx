import React from 'react';
import { CheckBox, Box, Button, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import styled from 'styled-components';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoText = styled(Text)<{ completed: boolean }>`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  flex: 1;
`;

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <Box
      direction="row"
      align="center"
      pad="small"
      margin={{ vertical: 'xsmall' }}
      background="background-contrast"
      round="small"
      border={{ color: 'dark-3', size: '1px' }}
    >
      <CheckBox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        toggle={false}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <TodoText 
        completed={todo.completed}
        data-testid={`todo-text-${todo.id}`}
        color={todo.completed ? "dark-5" : "text"}
        margin={{ left: 'small' }}
      >
        {todo.text}
      </TodoText>
      <Button
        icon={<Trash size="small" color="status-critical" />}
        onClick={() => onDelete(todo.id)}
        plain
        data-testid={`todo-delete-${todo.id}`}
      />
    </Box>
  );
};
