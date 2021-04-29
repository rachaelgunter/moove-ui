import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import AuthPage from './AuthPage';
import ButtonLink from './ButtonLink';

export const SUBMIT_BUTTON_TITLE = 'RECOVER PASSWORD';

interface InfoProps {
  title: string;
  content: string;
}

const useStyles = makeStyles({
  hintTitle: {
    marginBottom: '17px',
    fontWeight: 500,
  },
  hintContent: {
    fontWeight: 300,
    letterSpacing: 0.25,
    marginBottom: '27px',
  },
});

const Info: FC<InfoProps> = ({ title, content }: InfoProps) => {
  const classes = useStyles();

  return (
    <AuthPage>
      <Typography className={classes.hintTitle} variant="body1" align="center">
        {title}
      </Typography>
      <Typography className={classes.hintContent} variant="body2">
        {content}
      </Typography>
      <ButtonLink href="/" underline="none">
        BACK TO LOGIN
      </ButtonLink>
    </AuthPage>
  );
};

export default Info;
