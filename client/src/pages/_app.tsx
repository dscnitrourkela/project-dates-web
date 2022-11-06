import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';

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
    <ApolloWrapper>
      <AuthProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>NITR Avenue Dashboard</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>

          <ToastContainer />
        </CacheProvider>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default App;
