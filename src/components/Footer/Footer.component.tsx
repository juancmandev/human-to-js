import { Box, Typography, IconButton } from '@mui/material';
import { AnchorLink } from './Footer.styles';
import { paletteColor } from '@/styles/theme';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      sx={{
        marginTop: 1,
        width: '100vw',
        padding: '32px 40px 20px',
        textAlign: 'center',
        color: paletteColor.secondary.contrastText,
        bgcolor: paletteColor.secondary.dark,
      }}>
      <Typography>
        Developed by @juancmandev using{' '}
        <AnchorLink href='https://nextjs.org/' target='_blank'>
          NextJS
        </AnchorLink>{' '}
        and{' '}
        <AnchorLink href='https://openai.com/blog/chatgpt' target='_blank'>
          ChatGPT
        </AnchorLink>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <IconButton>
          <AnchorLink href='https://twitter.com/juancmandev' target='_blank'>
            <TwitterIcon sx={{ color: '#fff' }} />
          </AnchorLink>
        </IconButton>
        <IconButton>
          <AnchorLink
            href='https://github.com/juancmandev/human-to-js'
            target='_blank'>
            <GitHubIcon sx={{ color: '#fff' }} />
          </AnchorLink>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
