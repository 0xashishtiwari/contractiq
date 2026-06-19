import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import {prisma} from "@/lib/prisma";
import {SignInSchema} from "@/lib/validations/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { },
        password: { }
      },
      async authorize(credentials) {
        // Add your authorization logic here
        const { email, password } = SignInSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password as string, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    }),
   
    
  ],
  callbacks : {
    async jwt({token , user}){
      if(user){
        token.id = user.id;
      }
      return token;
    },
    async session({session , token}){
      if(token){
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})