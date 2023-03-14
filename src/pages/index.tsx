import { Box } from '@mui/material';
import HumanLanguage from '@/components/HumanLanguage/HumanLanguage.component';
import { NextSeo } from 'next-seo';

export default function Home() {
  const SEO = () => (
    <NextSeo
      title='Human to JavaScript'
      description='Use Natural Language to generate code!'
      openGraph={{
        url: 'https://human-to-js.juancman.dev/',
        title: 'juancmandev',
        description: 'Use Natural Language to generate code!',
        siteName: 'Human to JavaScript',
        images: [
          {
            url: 'https://i.imgur.com/d4u0L90.png',
            width: 300,
            height: 300,
            alt: 'Human to JavaScript',
            type: 'image/png',
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );

  return (
    <>
      <SEO />
      <Box
        sx={{
          width: '100%',
          padding: '20px 10px',
          display: 'grid',
          justifyContent: 'center',
        }}>
        <HumanLanguage />
      </Box>
    </>
  );
}
