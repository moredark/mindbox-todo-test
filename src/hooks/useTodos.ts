import { useState, useEffect, useMemo } from 'react';
import { Todo, FilterType } from '../types';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
      } catch (e) {
        console.error('Error with localStorage:', e);
        return [];
      }
    }
    return [];
  };

  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      // В реальном приложении ID будет приходить с бэкенда
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }

  const activeTodoCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'all') return todos;
    return todos.filter(todo =>
      filter === 'active' ? !todo.completed : todo.completed
    );
  }, [todos, filter]);

  return {
    todos,
    filteredTodos,
    filter,
    activeTodoCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  };
};
