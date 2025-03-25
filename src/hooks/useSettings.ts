import { useState, useEffect } from 'react';
import { TodoSettings } from '../types';

const SETTINGS_STORAGE_KEY = 'mindbox-todo-settings';

const defaultSettings: TodoSettings = {
  autoDeleteCompleted: false,
};

/**
 * Хук для управления настройками приложения
 * @returns {Object} Объект с настройками и методами управления
 * @property {TodoSettings} settings - Текущие настройки
 * @property {Function} updateSettings - Функция для обновления настроек
 * @property {Function} toggleAutoDeleteCompleted - Функция для переключения автоудаления завершенных задач
 */
export const useSettings = () => {
  const loadSettings = (): TodoSettings => {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
      try {
        return JSON.parse(storedSettings);
      } catch (e) {
        console.error('Ошибка при загрузке настроек из localStorage:', e);
        return defaultSettings;
      }
    }
    return defaultSettings;
  };

  const [settings, setSettings] = useState<TodoSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<TodoSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const toggleAutoDeleteCompleted = () => {
    updateSettings({
      autoDeleteCompleted: !settings.autoDeleteCompleted
    });
  };

  return {
    settings,
    updateSettings,
    toggleAutoDeleteCompleted
  };
};
