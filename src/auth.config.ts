import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const WHITELIST = (process.env.AUTH_WHITELIST ?? "")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

export default {
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      const username =
        typeof profile?.login === "string" ? profile.login : undefined;
      if (username && WHITELIST.includes(username)) {
        return true;
      }
      return false;
    },
    authorized: async ({ auth }) => !!auth,
    async session({ session, token }) {
      if (session.user && token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
