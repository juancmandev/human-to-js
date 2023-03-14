import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Footer from '@/components/Footer/Footer.component';

interface ChildrenProps {
  children: ReactNode;
}

const Main: FC<ChildrenProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'repeat(2, auto)',
      }}>
      {children}
      <Footer />
    </Box>
  );
};
export default Main;
