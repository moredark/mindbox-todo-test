import React from 'react';
import { Box, Heading } from 'grommet';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter';
import { TodoSettings } from '../TodoSettings';
import { useTodos } from '../../hooks/useTodos';
import { useSettings } from '../../hooks/useSettings';
import { useAutoDeleteCompleted } from '../../hooks/useAutoDeleteCompleted';
import { Todo } from '../../types';
import { TodoInput } from '../TodoInput';

export const TodoApp: React.FC = () => {
  const {
    todos,
    filteredTodos,
    filter,
    activeTodoCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  } = useTodos();

  const { settings, toggleAutoDeleteCompleted } = useSettings();

  useAutoDeleteCompleted(
    todos,
    settings.autoDeleteCompleted,
    clearCompleted
  );

  const hasCompletedTodos = todos.some((todo: Todo) => todo.completed);
  const isEmpty = todos.length === 0;

  return (
    <Box
      width="large"
      pad="medium"
      background="background-front"
      elevation="small"
      round="small"
      data-testid="todo-list"
    >
      <Box direction="row" justify="between" align="center" margin={{ bottom: "small" }}>
        <Heading level={2} margin="none" color="text-strong">
          Todo app
        </Heading>
        <TodoSettings
          settings={settings}
          onToggleAutoDelete={toggleAutoDeleteCompleted}
        />
      </Box>

      <TodoInput onAddTodo={addTodo} />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        isEmpty={isEmpty}
      />

      <TodoFilter
        activeFilter={filter}
        activeCount={activeTodoCount}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        hasCompleted={hasCompletedTodos}
      />
    </Box>
  );
};
