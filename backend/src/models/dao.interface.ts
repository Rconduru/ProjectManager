export interface IDao<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  save(t: T): Promise<T>;
  update(t: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export interface IDaoOwner<T> extends IDao<T> {
  getByIdAndOwnerId(id: number, ownerId: number): Promise<T>;

}
