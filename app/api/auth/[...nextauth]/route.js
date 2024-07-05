import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/app/models/User";
import connectDB from "@/app/db/connectDB";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, email,  }) {
      if (account.provider == "github" || account.provider == "google") {
        await connectDB();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
            email: user.email,
            name: user.email.split("@")[0],
            username: user.email.split("@")[0]
          });
        }
        return true;
      }
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
        session.user.name = dbUser.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
