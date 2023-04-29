import { useState, SyntheticEvent } from 'react';
import Image from 'next/image';
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
import * as Yup from 'yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import spinner from '../../assets/spinner.gif';
import { Configuration, OpenAIApi } from 'openai';

const SyntaxHighLighter = dynamic(() => import('react-syntax-highlighter'));

const functionSyntaxValues = ['Arrow Function', 'Simple Function'];

const openAIKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string;
const openAIOrganizationKey = process.env
  .NEXT_PUBLIC_OPENAI_ORGANIZATION_KEY as string;

const HumanLanguage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState('Copy to clipboard');
  const [generatedText, setGeneratedText] = useState<string | undefined>('');

  const validationSchema = () => ({
    humanQuery: Yup.string().required('You need to describe what do you want.'),
  });

  const formik = useFormik({
    initialValues: {
      humanQuery: '',
      jsObject: '',
      functionSyntax: functionSyntaxValues[0],
    },
    initialErrors: {},
    validationSchema: Yup.object(validationSchema()),
    onSubmit: ({ humanQuery, functionSyntax, jsObject }) => {
      setSubmitting(true);
      handleRequest({ humanQuery, functionSyntax, jsObject });
    },
  });

  const handleRequest = async ({
    humanQuery,
    functionSyntax,
    jsObject,
  }: any) => {
    const prompt = `Translate this natural language query: "${humanQuery}" using JavaScript with ${functionSyntax} syntax ${
      jsObject && `Use this object as reference: ${jsObject}`
    }, just the code, without explanations or comments`;

    const configuration = new Configuration({
      organization: openAIOrganizationKey,
      apiKey: openAIKey,
    });
    const openAI = new OpenAIApi(configuration);

    const response = await openAI.createCompletion({
      prompt: prompt,
      model: 'text-davinci-003',
      temperature: 0.5,
      max_tokens: 2000,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    if (response) {
      const data = response.data.choices[0].text;

      setSubmitting(false);
      setGeneratedText(data);
    } else setSubmitting(false);
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;

    setOpenSnackbar(false);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);

      setCopyTooltip('Copied!');
    }
  };

  const handleClear = () => {
    formik.resetForm();
    setOpenSnackbar(true);
    setSubmitting(false);
    setGeneratedText('');
  };

  const handleMouseLeaveCopy = () =>
    setTimeout(() => setCopyTooltip('Copy to clipboard'), 100);

  return (
    <>
      <Paper
        sx={{
          maxWidth: '400px',
          p: { xs: '8px 12px', sm: 4 },
        }}>
        <Typography variant='h6' sx={{ fontWeight: '600' }}>
          Human to JavaScript
        </Typography>
        <Form onSubmit={formik.handleSubmit}>
          <FormSection>
            <FormLabel
              error={
                formik.touched.humanQuery && Boolean(formik.errors.humanQuery)
              }
              sx={{
                fontWeight: '600',
              }}
              htmlFor='humanQuery'>
              Human Language Problem Description *
            </FormLabel>
            <TextField
              id='humanQuery'
              fullWidth
              multiline
              rows={4}
              placeholder={`Ex: Filter by zone and only the zones that starts with 'a'`}
              value={formik.values.humanQuery}
              onChange={formik.handleChange}
              error={
                formik.touched.humanQuery && Boolean(formik.errors.humanQuery)
              }
              helperText={formik.touched.humanQuery && formik.errors.humanQuery}
            />
          </FormSection>

          {/* I don't know if this field is necessary */}

          {/* <FormSection>
            <FormLabel sx={{ fontWeight: '600' }} htmlFor='jsObject'>
              JavaScript Object (Optional)
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
          </FormSection> */}

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
              disabled={submitting}
              sx={{
                textTransform: 'capitalize',
                fontSize: '1.1rem',
                minWidth: '100%',
              }}
              variant='contained'>
              {submitting ? (
                <Image width={30} height={30} src={spinner} alt='Spinner' />
              ) : (
                'Generate Code'
              )}
            </Button>
            <Button
              onClick={handleClear}
              color='secondary'
              sx={{
                textTransform: 'capitalize',
                fontSize: '1.1rem',
              }}
              variant='outlined'>
              Clear
            </Button>
          </FormSection>
        </Form>
        <Collapse in={Boolean(generatedText)}>
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
            {generatedText && (
              <SyntaxHighLighter
                language='javascript'
                wrapLines={true}
                lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
                customStyle={{
                  maxWidth: '400px',
                  maxHeight: 'none',
                  height: 'auto',
                  overflow: 'visible',
                  wordWrap: 'break-word',
                }}>
                {generatedText}
              </SyntaxHighLighter>
            )}
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
