import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import SystemNotification from './SystemNotification';

const NotificationContext = createContext(null);

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used inside NotificationProvider'
    );
  }

  return context;
}

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, type = 'success') => {
    setNotification({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {notification && (
        <SystemNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
}