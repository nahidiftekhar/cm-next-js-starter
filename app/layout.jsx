import Layout from "@/components/_Layout/Layout";
import { NextAuthProvider } from "@/components/_Layout/nextAuthProvider";
import { Providers } from "@/components/_Layout/providers";
import "@/styles/globals.scss";
import "@/styles/form.scss";
import "animate.css";

export const metadata = {
  title: "Hajira Admin Panel",
  description: "Hajira SaaS Platform: Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className="">
        <Providers>
          <NextAuthProvider>
              <Layout>{children}</Layout>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
