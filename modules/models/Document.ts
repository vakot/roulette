import mongoose from 'mongoose'

export interface IDocument<T = unknown, TQueryHelpers = any, DocType = any> extends mongoose.Document<T, TQueryHelpers, DocType> {
  createdAt?: Date
  updatedAt?: Date
}

export const timestamp = (schema: mongoose.Schema) => {
  schema.add({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })

  schema.pre<IDocument>('save', function (next) {
    this.updatedAt = new Date()
    next()
  })
}
