import bcrypt from 'bcryptjs'
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import connectDB from "../../../database/connection"
import User from "../../../models/schema"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // version: "2.0",
    }),
    CredentialsProvider({
      name: 'Credentials',
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password", placeholder: "********" }
      // },
      async authorize(credentials, req) {
        connectDB().catch(err => ({ connection_error: err })); // connect to database

        // check if user exists in database
        const result = await User.findOne({ email: credentials.email })
        // console.log({result})
        if (!result) {
          throw new Error('No user found')
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(credentials.password, result.password)
        if (!isMatch) {
          throw new Error('Password is incorrect')
        }
        console.log(result)
        return result
      }
    }),

    // ...add more providers here
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/user/signin',
    // signOut: '/user/signout',
    error: '/user/error', // Error code passed in query string as ?error=
    // verifyRequest: '/user/verify-request', // (used for check email message)
    newUser: '/user/new-user' // If set, new users will be directed here on first sign in
  }
}

export default NextAuth(authOptions)