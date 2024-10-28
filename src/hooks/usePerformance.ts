import { useState, useEffect } from 'react';
import { PerformanceMetrics } from '../types';

export const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null
  });

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fcp = entries[0];
          setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
        }
      });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcp = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
        }
      });

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fid = entries[0];
          setMetrics(prev => ({ ...prev, fid: fid.duration }));
        }
      });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          const layoutShift = entry as LayoutShiftEntry;
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });

      try {
        fcpObserver.observe({ type: 'paint', buffered: true });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        fidObserver.observe({ type: 'first-input', buffered: true });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (error) {
        console.warn('Performance metrics observation failed:', error);
      }

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return metrics;
};