import { User } from "@/app/models/User";
import connectToDb from "@/lib/connectToDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        connectToDb()
        const user = await User.findOne({email})
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (passwordOk) {
          return user;
          // return { id: user._id, email: user.email, role: user.role };
        }

        throw new Error('Invalid email or password');
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        // session.user.id = token.id;
        // session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // token.id = user.id;
        // token.role = user.role;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
