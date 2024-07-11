import clientPromise from '@modules/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    //   jwt: async ({ token, account }) => {
    //     console.log({ token, account })
    //     return token
    //   },
    // session: async ({ session, token, user }) => {
    //   console.log({ session, token, user })
    //   return session
    // }
    //   redirect: async ({ url, baseUrl }) => {
    //     return baseUrl
    //   },
    // signIn: async ({ user: _user }) => {
    //   const user = await User.findOne({ email: _user.email })
    //   if (!user) {
    //     await User.create(_user)
    //   }
    //   return true
    // }
  }
}
