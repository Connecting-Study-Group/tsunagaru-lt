// reference: https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/%5B...nextauth%5D.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { firebaseAdmin } from "../../../lib/firebaseAdmin"

export default NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials, req) => {
        const idToken = credentials?.idToken
        if (idToken) {
          try {
            const decoded = await firebaseAdmin.auth().verifyIdToken(idToken)
            return { ...decoded }
          } catch (error) {
            console.error("Failed to verify ID token:", error)
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return user
      }
      return token
    },
  },
})
