export interface Write<T> {
  insert(item: T): Promise<boolean>;
}

export interface Repository<T> extends Write<T> { }
