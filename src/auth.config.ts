import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    async session({ session, token }) {
      if (session.user && token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
