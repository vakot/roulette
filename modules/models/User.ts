import { IDocument, timestamp } from '@modules/models/Document'
import mongoose from 'mongoose'

export enum Roles {
  Admin = 'admin',
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
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email is invalid',
    ],
  },
  image: { type: String, required: false },
  roles: { type: [String], default: [] },
}).plugin(timestamp)

const User =
  mongoose.models.User<mongoose.Model<UserModelType>> ||
  mongoose.model<UserModelType>('User', UserSchema)

export default User

import type { AdapterSession } from 'next-auth/adapters'

const SessionSchema = new mongoose.Schema<AdapterSession>({
  expires: { type: Date, trim: true },
  sessionToken: { type: String, trim: true },
  userId: { type: String, ref: 'User' },
})

const Session =
  mongoose.models.Session<mongoose.Model<AdapterSession>> ||
  mongoose.model<AdapterSession>('Session', SessionSchema)

export { Session }

import type { Account as AdapterAccount } from 'next-auth'

const AccountSchema = new mongoose.Schema<AdapterAccount>({
  userId: { type: String, trim: true },
  type: { type: String, trim: true },
  provider: { type: String, trim: true },
  providerAccountId: { type: String, trim: true },
  refresh_token: { type: String, trim: true },
  access_token: { type: String, trim: true },
  expires_at: { type: Number, trim: true },
  token_type: { type: String, trim: true },
  scope: { type: String, trim: true },
  id_token: { type: String, trim: true },
  session_state: { type: String, trim: true },
  oauth_token_secret: { type: String, trim: true },
  oauth_token: { type: String, trim: true },
})

const Account =
  mongoose.models.Account<mongoose.Model<AdapterAccount>> ||
  mongoose.model<AdapterAccount>('Account', AccountSchema)

export { Account }

import type { VerificationToken as AdapterVerificationToken } from 'next-auth/adapters'

const VerificationTokenSchema = new mongoose.Schema<AdapterVerificationToken>({
  expires: { type: Date, trim: true },
  token: { type: String, trim: true },
  identifier: { type: String, trim: true },
})

const VerificationToken =
  mongoose.models.VerificationToken<mongoose.Model<AdapterVerificationToken>> ||
  mongoose.model<AdapterVerificationToken>(
    'VerificationToken',
    VerificationTokenSchema
  )

export { VerificationToken }
