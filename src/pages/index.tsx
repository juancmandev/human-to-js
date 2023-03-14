'use client';

import { Box } from '@mui/material';
import HumanLanguage from '@/components/HumanLanguage/HumanLanguage.component';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '60px 10px 40px',
          display: 'grid',
          justifyContent: 'center',
        }}>
        <HumanLanguage />
      </Box>
    </>
  );
}
