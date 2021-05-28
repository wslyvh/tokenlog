export interface Repository<T> {
  Create(item: T): Promise<T | undefined>
  FindAll(): Promise<Array<T>>
  FindOne(id: string): Promise<T | undefined>
  Update(id: string, item: T): Promise<boolean>
  Delete(id: string): Promise<boolean>
}
