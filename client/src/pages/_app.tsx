import React from 'react';
import { CacheProvider } from '@emotion/react';

import { EmotionCache } from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Head from 'next/head';
import { AuthProvider } from 'store/contexts';

import ApolloWrapper from '../lib/apollo';
import { theme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';

import type { AppProps } from 'next/app';
registerChartJs();

const clientSideEmotionCache = createEmotionCache();

export interface IAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const App: React.FC<IAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // @ts-ignore
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <ApolloWrapper>{getLayout(<Component {...pageProps} />)}</ApolloWrapper>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
