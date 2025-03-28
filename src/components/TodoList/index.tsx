import React from 'react';
import { Box, Text } from 'grommet';
import { TodoItem } from '../TodoItem';
import { TodoListProps } from './types';

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    toggleTodo,
    deleteTodo,
    isEmpty
}) => (
    <Box gap="xsmall">
        {isEmpty ? (
            <Box pad="medium" align="center">
                <Text color="text-weak">No tasks. Add a new task!</Text>
            </Box>
        ) : (
            <>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </>
        )}
    </Box>
);
