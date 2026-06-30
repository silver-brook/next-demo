import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  // 应用名称
  appName: process.env.APP_NAME ?? "NextDemo",
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }
  },
  plugins: [
    nextCookies(),// make sure this is the last plugin in the array
  ], 
});