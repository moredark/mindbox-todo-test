import { useState, useEffect } from 'react';
import { TodoSettings } from '../types';

const SETTINGS_STORAGE_KEY = 'mindbox-todo-settings';

const defaultSettings: TodoSettings = {
  autoDeleteCompleted: false,
};

export const useSettings = () => {
  // Загрузка настроек из localStorage при инициализации
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

  // Сохранение настроек в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Обновление настроек
  const updateSettings = (newSettings: Partial<TodoSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Переключение настройки автоудаления выполненных задач
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
