import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PlayerData {
  id: string;
  data: any;
  timestamp: number;
}

interface CareerDB extends DBSchema {
  'player-data': {
    key: string;
    value: PlayerData;
    indexes: { 'by-timestamp': number };
  };
}

class IndexedDBManager {
  private static instance: IndexedDBManager;
  private db: IDBPDatabase<CareerDB> | null = null;
  private dbName = 'career-companion-db';
  private version = 1;

  private constructor() {
    this.initDB();
  }

  public static getInstance(): IndexedDBManager {
    if (!IndexedDBManager.instance) {
      IndexedDBManager.instance = new IndexedDBManager();
    }
    return IndexedDBManager.instance;
  }

  private async initDB() {
    try {
      this.db = await openDB<CareerDB>(this.dbName, this.version, {
        upgrade(db) {
          const store = db.createObjectStore('player-data', {
            keyPath: 'id'
          });
          store.createIndex('by-timestamp', 'timestamp');
        }
      });
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  }

  public async savePlayerData(id: string, data: any) {
    if (!this.db) await this.initDB();
    try {
      await this.db?.put('player-data', {
        id,
        data,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error saving player data:', error);
      throw error;
    }
  }

  public async getPlayerData(id: string) {
    if (!this.db) await this.initDB();
    try {
      const data = await this.db?.get('player-data', id);
      return data?.data || null;
    } catch (error) {
      console.error('Error retrieving player data:', error);
      return null;
    }
  }

  public async getAllPlayerData() {
    if (!this.db) await this.initDB();
    try {
      return await this.db?.getAll('player-data') || [];
    } catch (error) {
      console.error('Error retrieving all player data:', error);
      return [];
    }
  }

  public async deletePlayerData(id: string) {
    if (!this.db) await this.initDB();
    try {
      await this.db?.delete('player-data', id);
    } catch (error) {
      console.error('Error deleting player data:', error);
      throw error;
    }
  }

  public async clearAllData() {
    if (!this.db) await this.initDB();
    try {
      await this.db?.clear('player-data');
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}

export const dbManager = IndexedDBManager.getInstance();