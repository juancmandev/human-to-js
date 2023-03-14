import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import { theme } from '@/styles/theme';

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const { emotionCache = clientSideEmotionCache }: any = pageProps;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
