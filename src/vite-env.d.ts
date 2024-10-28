/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  __WB_MANIFEST: any;
}

interface ServiceWorkerRegistration {
  sync: {
    register(tag: string): Promise<void>;
  };
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}