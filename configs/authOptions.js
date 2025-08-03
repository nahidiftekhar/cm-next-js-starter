import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
require("dotenv").config();

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(`${process.env.HOSTNAME}/api/auth/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        const apiResult = res.data;
        const user = apiResult.success ? apiResult.user : null;

        if (user) {
          return { ...user };
        } else {
          throw new Error(JSON.stringify({ error: apiResult, status: false }));
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          image: token.image,
          uuid: token.uuid,
          passChangePending: token.passChangePending,
          roles: token.roles,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          image: u.image,
          uuid: u.uuid,
          passChangePending: u.pass_change_required,
          roles: u.roles,
        };
      }
      return token;
    },
  },
};
