import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(client),
  callbacks: {
    async jwt({ token }) {
        return token;
    },
    async session({ session, token }) {
      if(session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
