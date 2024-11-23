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
          return credentials;
        } catch (error) {
          console.log("AUTH ERROR", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
