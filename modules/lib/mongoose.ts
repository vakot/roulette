import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri: string = process.env.MONGODB_URI

let _global = global as typeof globalThis & { mongoose: any }
let cached = _global.mongoose

if (!cached) {
  cached = _global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      // bufferCommands: false
    }

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongoose) => {
        console.log('🚀 Successfully connected to database')
        return mongoose
      })
      .catch((error) => {
        console.error('🔴 Failed to connect to MongoDB:', error)
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}
