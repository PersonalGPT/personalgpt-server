export interface Read<T> {
  getAll(): Promise<T[]>;
}

export interface Write<T> {
  insert(item: T): Promise<boolean>;
}

export interface Repository<T> extends Read<T>, Write<T> { }
