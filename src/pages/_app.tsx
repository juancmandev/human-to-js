import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import { theme } from '@/styles/theme';
import Main from '@/layouts/Main.layout';

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const { emotionCache = clientSideEmotionCache }: any = pageProps;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Main>
          <Component {...pageProps} />
          <Analytics />
        </Main>
      </ThemeProvider>
    </CacheProvider>
  );
}
