import { PerformanceMetrics } from '../types';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init() {
    if (this.initialized) return;
    
    if ('indexedDB' in window) {
      const request = indexedDB.open('analytics', 1);
      request.onerror = () => console.error('Failed to open analytics database');
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore('events', { autoIncrement: true });
      };
    }

    this.initialized = true;
  }

  public trackEvent({ category, action, label, value }: AnalyticsEvent) {
    if (!navigator.onLine) {
      this.storeOfflineEvent({ category, action, label, value });
      return;
    }

    this.sendEvent({ category, action, label, value });
  }

  public trackPerformance(metrics: PerformanceMetrics) {
    Object.entries(metrics).forEach(([metric, value]) => {
      if (typeof value === 'number') {
        this.trackEvent({
          category: 'Performance',
          action: metric.toUpperCase(),
          value
        });
      }
    });
  }

  private async storeOfflineEvent(event: AnalyticsEvent) {
    const request = indexedDB.open('analytics', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['events'], 'readwrite');
      const store = transaction.objectStore('events');
      store.add({ ...event, timestamp: Date.now() });
    };
  }

  private async sendEvent(event: AnalyticsEvent) {
    console.log('Analytics event:', event);
  }

  public async syncOfflineEvents() {
    if (!navigator.onLine) return;

    const request = indexedDB.open('analytics', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['events'], 'readwrite');
      const store = transaction.objectStore('events');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const events = getAllRequest.result;
        events.forEach(event => {
          this.sendEvent(event);
        });

        store.clear();
      };
    };
  }
}

export const analytics = Analytics.getInstance();