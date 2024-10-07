import { useCallback, useState } from 'react';
import GlobalNotificationContext from '../../contexts/GlobalNotificationContext.ts';
import PropTypes, { InferProps } from 'prop-types';

function GlobalNotificationProvider ({ children }: InferProps<typeof GlobalNotificationProvider.propTypes>) {
  const [type, setType] = useState<'error' | 'success' | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const setNotification = useCallback((type?: 'error' | 'success', title?: string, message?: string) => {
    setType(type);
    setTitle(title);
    setMessage(message);
  }, []);

  const removeNotification = useCallback(() => setNotification(), [setNotification]);

  return (
    <GlobalNotificationContext.Provider
      value={{
        type,
        title,
        message,
        setNotification,
        removeNotification
      }}
    >
      {children}
    </GlobalNotificationContext.Provider>
  );
};

GlobalNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default GlobalNotificationProvider;