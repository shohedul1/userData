import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "../config/dbConfig";
import User from "../models/auth";
import bycrptjs from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    await connect();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    };
                    const passwordsMatch = await bycrptjs.compare(
                        password,
                        user.password
                    );
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;

                } catch (error) {
                    console.log(error)
                }

            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async signIn({ user, account }: { user: any, account: any }) {
            if (account.provider === 'google') {
                try {
                    const { name, email } = user;
                    await connect();
                    const ifUserExists = await User.findOne({ email });
                    if (ifUserExists) {
                        return user;
                    }
                    const newUser = new User({
                        name: name,
                        email: email,
                    });
                    const res = await newUser.save();
                    if (res.status === 200 || res.status === 201) {
                        console.log(res)
                        return user;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user;

        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }
            console.log(session);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: "/",
    },

}