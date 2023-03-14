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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SyntaxHighLighter = dynamic(() => import('react-syntax-highlighter'));

const functionSyntaxValues = ['Arrow Function', 'Simple Function'];

const codeExample = `const filteredItems = items.filter(item => item.zone === userZone && item.available);`;

const HumanLanguage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState('Copy to clipboard');
  const [generatedText, setGeneratedText] = useState('');

  const formik = useFormik({
    initialValues: {
      jsObject: '',
      humanQuery: '',
      functionSyntax: functionSyntaxValues[0],
    },
    initialErrors: {},
    onSubmit: () => {
      setHasSubmitted(true);
      handleRequest();
    },
  });

  const handleRequest = async () => {
    const requestBody = {
      query: formik.values.humanQuery,
      functionSyntax: formik.values.functionSyntax,
      jsObject: formik.values.jsObject,
    };

    const response = await fetch('/api/convert', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();

      setGeneratedText(data.outputText);
    }
  };

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
              Function Syntax
            </FormLabel>
            <Select
              id='functionSyntax'
              name='functionSyntax'
              value={formik.values.functionSyntax}
              onChange={formik.handleChange}>
              {functionSyntaxValues.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormSection>
          <FormSection>
            <Button
              type='submit'
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
              wrapLines={true}
              lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
              customStyle={{
                maxWidth: '375px',
                maxHeight: 'none',
                height: 'auto',
                overflow: 'visible',
                wordWrap: 'break-word',
              }}>
              {generatedText}
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
