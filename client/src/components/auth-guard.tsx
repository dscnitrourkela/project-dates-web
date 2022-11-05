/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useAuthContext } from '../store/contexts';

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const ignore = useRef(false);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  /**
   * Only do authentication check on component mount.
   * This flow allows you to manually redirect the user after sign-out, otherwise this will be
   * triggered and will automatically redirect to sign-in page.
   */
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting');
      router
        .replace({
          pathname: '/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!checked) {
    return <></>;
  }

  /**
   * If got here, it means that the redirect did not occur, and that tells us
   * that the user is authenticated / authorized.
   */
  return <>{children}</>;
};
