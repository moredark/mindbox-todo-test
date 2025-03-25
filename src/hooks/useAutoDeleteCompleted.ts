import { useEffect } from 'react';
import { Todo } from '../types';
import { AUTO_DELETE_TIMEOUT_MS } from '../constants';

/**
 * Хук для автоматического удаления выполненных задач через заданный промежуток времени
 * 
 * @param todos Массив задач
 * @param isAutoDeleteEnabled Флаг, указывающий включено ли автоудаление
 * @param clearCompleted Функция для удаления выполненных задач
 */
export const useAutoDeleteCompleted = (
  todos: Todo[],
  isAutoDeleteEnabled: boolean,
  clearCompleted: () => void
) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isAutoDeleteEnabled) {
      const completedTodos = todos.filter(todo => todo.completed);
      if (completedTodos.length > 0) {
        timeoutId = setTimeout(() => {
          clearCompleted();
        }, AUTO_DELETE_TIMEOUT_MS);
      }
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAutoDeleteEnabled, todos, clearCompleted]);
};
