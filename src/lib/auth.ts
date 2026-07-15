import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";

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
    },
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
        defaultValue: "buyer",
      },

      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },
  hooks: {
  before: createAuthMiddleware(async (ctx) => {
    // শুধু Email Login এর সময় চলবে
    if (ctx.path !== "/sign-in/email") {
      return;
    }

    const email = ctx.body?.email;

    if (!email) return;

    // MongoDB থেকে user খুঁজে বের করো
    const user = await db.collection("user").findOne({ email });

    if (user?.status === "suspended") {
      throw new APIError("FORBIDDEN", {
        message: "Your account has been suspended by the administrator.",
      });
    }
  }),
},

  plugins: [jwt()],
});
// auth.ts ফাইলের একদম শেষে এটি বসাও
export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
