export abstract class BaseDAL<T> {
  protected store: Map<string, T>;

  constructor() {
    this.store = new Map();
  }

  protected async get(id: string): Promise<T | null> {
    return this.store.get(id) || null;
  }

  protected async set(id: string, data: T): Promise<void> {
    this.store.set(id, data);
  }

  protected async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  protected async clear(): Promise<void> {
    this.store.clear();
  }
} 