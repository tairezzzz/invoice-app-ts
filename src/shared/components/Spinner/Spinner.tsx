import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(8),
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <>
      <LinearProgress className={classes.progress} color="secondary" />
    </>
  );
}