/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

const GlobalNotificationContext = createContext<{
  type: 'error' | 'success' | undefined;
  title: string | undefined;
  message: string | undefined;
  setNotification: (type?: 'error' | 'success', title?: string, message?: string) => void;
  removeNotification: () => void;
}>({
  type: undefined,
  title: undefined,
  message: undefined,
  setNotification: (_type?: 'error' | 'success', _title?: string, _message?: string) => {},
  removeNotification: () => {},
});

export default GlobalNotificationContext;