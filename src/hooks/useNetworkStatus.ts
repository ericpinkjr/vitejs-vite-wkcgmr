import { useState, useEffect } from 'react';

interface NetworkStatus {
  online: boolean;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
    effectiveType: null,
    downlink: null,
    rtt: null
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, online: navigator.onLine }));
    };

    const updateConnectionStatus = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setStatus({
          online: navigator.onLine,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        });
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionStatus);
      updateConnectionStatus();
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', updateConnectionStatus);
      }
    };
  }, []);

  return status;
};