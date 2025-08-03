'use client';

import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider refetchInterval={10 * 60}>{children}</SessionProvider>
  );
};
