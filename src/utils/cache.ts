class CacheManager {
  private static instance: CacheManager;
  private cacheName: string = 'app-cache-v1';

  private constructor() {}

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public async cacheData(key: string, data: any) {
    try {
      const cache = await caches.open(this.cacheName);
      const response = new Response(JSON.stringify(data));
      await cache.put(key, response);
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  public async getCachedData(key: string) {
    try {
      const cache = await caches.open(this.cacheName);
      const response = await cache.match(key);
      if (!response) return null;
      return await response.json();
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      return null;
    }
  }

  public async clearCache() {
    try {
      await caches.delete(this.cacheName);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  public async updateCache(key: string, data: any) {
    try {
      await this.clearCache();
      await this.cacheData(key, data);
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  }
}

export const cacheManager = CacheManager.getInstance();