import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGO_DB_URI as string);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook"], // যে প্রোভাইডারগুলোকে তুমি ট্রাস্ট করো
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      scopes: ["public_profile"], // 👈 এখানে শুধু public_profile রাখো, email কেটে দাও
    },
  },
  user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "buyer", // নতুন কেউ অ্যাকাউন্ট খুললেই সে buyer হবে
            }
        }
    }
});
// auth.ts ফাইলের একদম শেষে এটি বসাও
export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;