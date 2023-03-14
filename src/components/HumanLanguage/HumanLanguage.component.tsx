import { useState, SyntheticEvent } from 'react';
import dynamic from 'next/dynamic';
import {
  Button,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Collapse,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Form, FormSection } from './HumanLanguage.styles';
import { useFormik } from 'formik';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SyntaxHighLighter = dynamic(() => import('react-syntax-highlighter'));

const codeSyntaxValues = ['Arrow Function', 'Simple Function'];

const codeExample = `const filteredItems = items.filter(item => item.zone === userZone && item.available);`;

const HumanLanguage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState('Copy to clipboard');

  const formik = useFormik({
    initialValues: {
      jsObject: '',
      humanQuery: '',
      codeSyntax: codeSyntaxValues[0],
    },
    initialErrors: {},
    onSubmit: (values) => {
      setHasSubmitted(true);
      console.log(values);
    },
  });

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;

    setOpenSnackbar(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);

    setCopyTooltip('Copied!');
  };

  const handleMouseLeaveCopy = () =>
    setTimeout(() => setCopyTooltip('Copy to clipboard'), 100);

  return (
    <>
      <Paper sx={{ p: 4 }}>
        <Typography variant='h6' sx={{ fontWeight: '600' }}>
          Human to JavaScript Array Methods
        </Typography>
        <Form onSubmit={formik.handleSubmit}>
          <FormSection>
            <FormLabel sx={{ fontWeight: '600' }} htmlFor='jsObject'>
              JavaScript Object
            </FormLabel>
            <TextField
              id='jsObject'
              fullWidth
              multiline
              rows={1}
              placeholder={`Ex: { id: 1, name: 'Jone', zone: 'A'}`}
              value={formik.values.jsObject}
              onChange={formik.handleChange}
            />
          </FormSection>
          <FormSection>
            <FormLabel sx={{ fontWeight: '600' }} htmlFor='humanQuery'>
              Human Language Problem Description
            </FormLabel>
            <TextField
              id='humanQuery'
              fullWidth
              multiline
              rows={2}
              placeholder={`Ex: Filter by zone and only the zones that starts with 'a'`}
              value={formik.values.humanQuery}
              onChange={formik.handleChange}
            />
          </FormSection>
          <FormSection>
            <FormLabel sx={{ fontWeight: '600' }} htmlFor='human-query'>
              Code Syntax
            </FormLabel>
            <Select
              id='codeSyntax'
              name='codeSyntax'
              value={formik.values.codeSyntax}
              onChange={formik.handleChange}>
              {codeSyntaxValues.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormSection>
          <FormSection>
            <Button
              type='submit'
              disabled={hasSubmitted}
              sx={{ textTransform: 'capitalize', fontSize: '1.1rem' }}
              variant='contained'>
              Generate Code
            </Button>
            <Button
              onClick={() => {
                formik.resetForm();
                setOpenSnackbar(true);
                setHasSubmitted(false);
              }}
              sx={{ textTransform: 'capitalize', fontSize: '1.1rem' }}
              variant='outlined'>
              Clear
            </Button>
          </FormSection>
        </Form>
        <Collapse in={hasSubmitted}>
          <Box>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                Here is your code!
              </Typography>
              <Tooltip
                placement='left'
                title={
                  <Typography variant='caption'>{copyTooltip}</Typography>
                }>
                <IconButton
                  onClick={handleCopy}
                  onMouseLeave={handleMouseLeaveCopy}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <SyntaxHighLighter
              language='javascript'
              style={docco}
              wrapLines={true}
              lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
              customStyle={{
                maxWidth: '375px',
                maxHeight: 'none',
                height: 'auto',
                overflow: 'visible',
                wordWrap: 'break-word',
              }}>
              {codeExample}
            </SyntaxHighLighter>
          </Box>
        </Collapse>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}>
          Fields cleared!
        </Alert>
      </Snackbar>
    </>
  );
};

export default HumanLanguage;
