import { useContext } from 'react';
import GlobalNotificationContext from '../contexts/GlobalNotificationContext.ts';

const useGlobalNotification = () => useContext(GlobalNotificationContext);

export default useGlobalNotification;