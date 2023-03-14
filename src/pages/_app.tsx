import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const { emotionCache = clientSideEmotionCache }: any = pageProps;

  return (
    <CacheProvider value={emotionCache}>
      {' '}
      <Component {...pageProps} />
    </CacheProvider>
  );
}
