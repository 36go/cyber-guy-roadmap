import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [progress, setProgress] = useLocalStorage('bootcamp-progress', {
    completedDays: [],
    completedTasks: [],
    bookmarkedResources: [],
    completedProjects: [],
    completedCertifications: [],
    notes: {},
    currentDay: 1,
    streak: 0,
    lastActive: null
  });

  const [theme, setTheme] = useLocalStorage('bootcamp-theme', 'dark');
  const [filters, setFilters] = useLocalStorage('bootcamp-filters', {});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = 'rtl';
  }, [theme]);

  const markDayComplete = (day) => {
    setProgress(prev => {
      const completedDays = prev.completedDays.includes(day)
        ? prev.completedDays
        : [...prev.completedDays, day];
      return { ...prev, completedDays };
    });
  };

  const markTaskComplete = (day, taskIndex) => {
    setProgress(prev => {
      const key = `${day}-${taskIndex}`;
      const completedTasks = prev.completedTasks.includes(key)
        ? prev.completedTasks.filter(t => t !== key)
        : [...prev.completedTasks, key];
      return { ...prev, completedTasks };
    });
  };

  const toggleBookmark = (resourceId) => {
    setProgress(prev => {
      const bookmarkedResources = prev.bookmarkedResources.includes(resourceId)
        ? prev.bookmarkedResources.filter(id => id !== resourceId)
        : [...prev.bookmarkedResources, resourceId];
      return { ...prev, bookmarkedResources };
    });
  };

  const addNote = (day, note) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [day]: note }
    }));
  };

  const completeProject = (projectId) => {
    setProgress(prev => ({
      ...prev,
      completedProjects: prev.completedProjects.includes(projectId)
        ? prev.completedProjects
        : [...prev.completedProjects, projectId]
    }));
  };

  const completeCertification = (certId) => {
    setProgress(prev => ({
      ...prev,
      completedCertifications: prev.completedCertifications.includes(certId)
        ? prev.completedCertifications
        : [...prev.completedCertifications, certId]
    }));
  };

  const completionPercentage = () => {
    const totalItems = 30 + 5 + 6;
    const completed = progress.completedDays.length + progress.completedProjects.length + progress.completedCertifications.length;
    return Math.round((completed / totalItems) * 100);
  };

  const value = {
    progress,
    setProgress,
    theme,
    setTheme,
    filters,
    setFilters,
    markDayComplete,
    markTaskComplete,
    toggleBookmark,
    addNote,
    completeProject,
    completeCertification,
    completionPercentage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
