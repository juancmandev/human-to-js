'use client';

import { Box } from '@mui/material';
import HumanLanguage from '@/components/HumanLanguage/HumanLanguage.component';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '60px 20px',
          display: 'grid',
          placeItems: 'center',
        }}>
        <HumanLanguage />
      </Box>
    </>
  );
}
