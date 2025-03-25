import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, FilterType } from '../types';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  // Загрузка задач из localStorage при инициализации
  const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      try {
        // Преобразуем строки дат обратно в объекты Date
        return JSON.parse(storedTodos, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
      } catch (e) {
        console.error('Ошибка при загрузке задач из localStorage:', e);
        return [];
      }
    }
    return [];
  };

  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  // Сохранение задач в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Добавление новой задачи
  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Переключение статуса задачи (выполнена/не выполнена)
  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Удаление задачи
  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Очистка всех выполненных задач
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  // Количество незавершенных задач
  const activeTodoCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return {
    todos,
    filter,
    activeTodoCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  };
};
