import { Repository } from './interfaces/repository'
import { model } from 'mongoose'

export abstract class BaseRepository<T> implements Repository<T> {
  protected _model: any

  constructor(modelName: string) {
    this._model = model(modelName)
  }

  public async Create(item: T): Promise<T | undefined> {
    try {
      const result = await this._model.create(item)

      return result
    } catch (e) {
      console.log("Couldn't create item", item)
      console.error(e)
    }
  }

  public async FindAll(): Promise<Array<T>> {
    try {
      return await this._model.find({})
    } catch (e) {
      console.log("Couldn't find items")
      console.error(e)

      return []
    }
  }

  public async FindOne(id: string): Promise<T | undefined> {
    try {
      return await this._model.findOne({ _id: id })
    } catch (e) {
      console.log("Couldn't find item", id)
      console.error(e)
    }
  }

  public async Update(id: string, item: T): Promise<boolean> {
    try {
      const result = await this._model.findByIdAndUpdate(id, item, {
        new: true,
        lean: true,
      })

      return result
    } catch (e) {
      console.log("Couldn't update item", id)
      console.error(e)

      return false
    }
  }

  public async Delete(id: string): Promise<boolean> {
    try {
      const result = await this._model.findByIdAndDelete(id)

      return result
    } catch (e) {
      console.log("Couldn't update item", id)
      console.error(e)

      return false
    }
  }
}
