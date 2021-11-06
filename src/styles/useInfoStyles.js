import { makeStyles } from '@mui/styles';

const useInfoStyles = makeStyles((theme) => ({
  greyTitle: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingTop: '2rem',
  }
}));

export default useInfoStyles;