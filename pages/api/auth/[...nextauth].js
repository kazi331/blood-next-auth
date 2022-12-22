import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "../../../database/connection"
import User from "../../../models/schema"
import bcrypt from 'bcryptjs'

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
      version: "2.0",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {
        connectDB().catch(err => { connection_error: err }); // connect to database

        // check if user exists in database
        const result = await User.findOne({ email: credentials.email })
        console.log({result})
        if (!result) {
          throw new Error('No user found')
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(credentials.password, result.password)
        if (!isMatch) {
          throw new Error('Password is incorrect')
        }
        // return user
        return result
      }
    }),

    // ...add more providers here
  ],
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)