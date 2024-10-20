import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri: string = process.env.MONGODB_URI

const _global = global as typeof globalThis & { mongoose: any }
let cached = _global.mongoose

if (!cached) {
  cached = _global.mongoose = { connection: null, promise: null }
}

export async function initializeDatabase() {
  if (cached.connection) {
    return cached.connection
  }

  if (!cached.promise) {
    const options = {}

    cached.promise = mongoose
      .connect(uri, options)
      .then((mongoose) => {
        console.log('🚀 Connected to database')
        return mongoose
      })
      .catch((error) => {
        console.error('❌ Failed to connect to MongoDB:', error)
        throw error
      })
  }

  cached.connection = await cached.promise
  return cached.connection
}
