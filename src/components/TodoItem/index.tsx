import React from 'react';
import { CheckBox, Button } from 'grommet';
import { Trash } from 'grommet-icons';
import { TodoItemProps } from './types';
import { AnimatedTodoBox, TodoText } from './styles';
import { ANIMATION_DURATION } from '../../constants/animations';

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isRemoving, setIsRemoving] = React.useState(false);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, ANIMATION_DURATION.SHORT);
  };

  return (
    <AnimatedTodoBox
      direction="row"
      align="center"
      pad="small"
      margin={{ vertical: 'xsmall' }}
      background="background-contrast"
      round="small"
      border={{ color: 'dark-3', size: '1px' }}
      className={isRemoving ? 'removing' : ''}
    >
      <CheckBox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
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
        onClick={handleDelete}
        plain
        data-testid={`todo-delete-${todo.id}`}
      />
    </AnimatedTodoBox>
  );
};
