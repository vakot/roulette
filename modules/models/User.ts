import { IDocument, timestamp } from '@modules/models/Document'
import mongoose from 'mongoose'

export enum Roles {
  Admin = 'admin'
}

export interface IUser {
  _id?: string
  name?: string
  email?: string
  image?: string
  roles: string[]
}
export type UserModelType = Omit<IUser, '_id'> & IDocument

export const UserSchema = new mongoose.Schema<UserModelType>({
  name: { type: String, required: false },
  email: { type: String, required: false },
  image: { type: String, required: false },
  roles: { type: [String], default: [] }
}).plugin(timestamp)

const User = mongoose.models.User<mongoose.Model<UserModelType>> || mongoose.model<UserModelType>('User', UserSchema)

export default User
