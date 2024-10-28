import { useState, useEffect } from 'react';
import { Workbox } from 'workbox-window';

export const useAppUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [wb, setWb] = useState<Workbox | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const workbox = new Workbox('/sw.js');

      workbox.addEventListener('waiting', () => {
        setUpdateAvailable(true);
      });

      workbox.register();
      setWb(workbox);
    }
  }, []);

  const applyUpdate = () => {
    if (wb) {
      wb.messageSkipWaiting();
      window.location.reload();
    }
  };

  return { updateAvailable, applyUpdate };
};