export interface Read<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  exists(id: string): Promise<boolean>;
}

export interface Write<T> {
  insert(item: T): Promise<boolean>;
  update(id: string, replacement: Partial<T>): Promise<T>;
}

export interface Repository<T> extends Read<T>, Write<T> { }
