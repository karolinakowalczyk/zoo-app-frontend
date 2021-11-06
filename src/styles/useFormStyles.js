import { makeStyles } from '@mui/styles';

const useFormStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '10rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '5rem',
    paddingRight: '2rem'
  },
  input: {
    padding: '0.75rem',
    width: '100%',
    height: '3rem',
    border: '0.01rem solid',
    borderColor: theme.palette.primary.main,
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: '0.25rem',
    backgroundColor: theme.palette.secondary.verylight,
    fontSize: '1rem',
  },
  form: {
    width: '100%',
    marginTop: 1,
  },
  submit: {
    boxSizing: 'content-box',
    padding: '0.75rem',
    marginTop: '1rem',
    marginBottom: '2rem',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
  buttonText: {
    color: theme.palette.primary.white,
  },
  alert: {
    marginTop: 1,
  },
  h1: {
    color: theme.palette.primary.black
  },
}));

export default useFormStyles;