import { dbManager } from './db';
import { cacheManager } from './cache';
import { analytics } from './analytics';

class SyncManager {
  private static instance: SyncManager;
  private syncInProgress: boolean = false;

  private constructor() {
    this.initSync();
  }

  public static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  private async initSync() {
    window.addEventListener('online', () => {
      this.syncData();
    });

    // Register for background sync if available
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      if ('sync' in registration) {
        await registration.sync.register('sync-player-data');
      }
    }
  }

  public async syncData() {
    if (this.syncInProgress || !navigator.onLine) return;

    try {
      this.syncInProgress = true;

      const allData = await dbManager.getAllPlayerData();
      for (const item of allData) {
        await cacheManager.cacheData(`player-${item.id}`, item.data);
      }

      await analytics.syncOfflineEvents();

      this.syncInProgress = false;
    } catch (error) {
      console.error('Error during sync:', error);
      this.syncInProgress = false;
    }
  }

  public async forceSyncData() {
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline');
    }
    return this.syncData();
  }
}

export const syncManager = SyncManager.getInstance();