import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      type: "credentials",
      async authorize(credentials) {
        try {
          const user = {
            id: credentials.id as string,
            name: credentials.name as string,
            email: credentials.email as string,
          }
          return user;
        } catch (error) {
          console.error("AUTH ERROR", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
