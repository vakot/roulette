import { initializeDatabase } from '@modules/lib/mongoose'
import User, { Account, Session, VerificationToken } from '@modules/models/User'
import type { Adapter } from 'next-auth/adapters'

const MongooseAdapter = (): Adapter => {
  return {
    async createUser(data: any) {
      await initializeDatabase()
      const user = await User.create(data)
      return user
    },

    async getUser(id) {
      await initializeDatabase()
      const user = await User.findById(id)
      return user
    },

    async getUserByEmail(email) {
      await initializeDatabase()
      const user = await User.findOne({ email })
      return user
    },

    async getUserByAccount(data) {
      const { providerAccountId, provider } = data
      await initializeDatabase()

      const account = await Account.findOne({ providerAccountId, provider })
      if (!account) return null

      const user = await User.findById(account.userId)
      return user
    },

    async updateUser(data) {
      const { id, ...restData } = data
      await initializeDatabase()
      const user = await User.findByIdAndUpdate(id, restData, {
        new: true,
        runValidators: true,
        returnDocument: 'after',
      })

      return user!
    },

    async deleteUser(userId) {
      await initializeDatabase()
      const user = await User.findByIdAndDelete(userId)
      return user
    },

    async linkAccount(data: any) {
      await initializeDatabase()
      const account = await Account.create(data)
      return account
    },

    async unlinkAccount(data) {
      const { providerAccountId, provider } = data
      await initializeDatabase()
      const account = await Account.findOneAndDelete({
        providerAccountId,
        provider,
      })

      if (account) return account
    },

    async createSession(data) {
      await initializeDatabase()
      const session = await Session.create(data)
      return session
    },

    async getSessionAndUser(sessionToken) {
      await initializeDatabase()

      const session = await Session.findOne({ sessionToken })
      if (!session) return null

      const user = await User.findById(session.userId)
      if (!user) return null

      return { user, session }
    },

    async updateSession(data: any) {
      const { id, ...restData } = data
      await initializeDatabase()
      const session = await Session.findByIdAndUpdate(id, restData, {
        new: true,
        runValidators: true,
      })
      return session
    },

    async deleteSession(sessionToken) {
      await initializeDatabase()
      const session = await Session.findOneAndDelete({ sessionToken })
      return session
    },

    async createVerificationToken(data) {
      await initializeDatabase()
      const verificationToken = await VerificationToken.create(data)
      return verificationToken
    },

    async useVerificationToken(data) {
      const { identifier, token } = data
      await initializeDatabase()
      const verificationToken = await VerificationToken.findOne({
        identifier,
        token,
      })
      return verificationToken
    },
  }
}

export default MongooseAdapter
