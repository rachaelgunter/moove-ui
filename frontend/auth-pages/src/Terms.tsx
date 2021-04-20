import React, { FC, useContext, useState } from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  Box,
  Tooltip,
  fade,
} from '@material-ui/core';

import AuthPage from './AuthPage';
import Link from './Link';
import SubmitButton from './SubmitButton';
import TermsContent from './TermsContent/TermsContent';
import TermsProvider from './TermsProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  container: {
    maxHeight: 470,
    overflowY: 'auto',
    marginBottom: theme.spacing(3),
    marginRight: -theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  title: {
    fontWeight: 500,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  agreeButton: {
    width: '150px',
    marginBottom: theme.spacing(2),

    '&:disabled': {
      backgroundColor: fade(theme.palette.secondary.dark, 0.4),
      color: fade(theme.palette.text.primary, 0.4),
    },
  },
  hint: {
    lineHeight: '36px',
    marginBottom: theme.spacing(2),
  },
}));

const Terms: FC = () => {
  const classes = useStyles();
  const [isViewed, setIsViewed] = useState(false);
  const { root } = classes;
  const { termsAccepted, handleTermsAcceptance } = useContext(TermsProvider);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      setIsViewed(true);
    }
  };

  return (
    <AuthPage size="large">
      <Box className={classes.container} onScroll={handleScroll}>
        <Typography
          classes={{ root }}
          className={classes.title}
          variant="body2"
          align="center"
          component="p"
        >
          TERMS OF USE
        </Typography>
        <Typography classes={{ root }} variant="body2" component="div">
          <TermsContent />
        </Typography>
      </Box>
      <Box className={classes.footer}>
        {termsAccepted ? (
          <Typography classes={{ root: classes.hint }} variant="body2">
            Terms accepted. You can now proceed to sign up
          </Typography>
        ) : (
          <Tooltip
            disableHoverListener={isViewed}
            disableFocusListener={isViewed}
            title="You need to read to the bottom of these terms and conditions before you can continue"
            placement="top"
          >
            <span>
              <SubmitButton
                onClick={() => handleTermsAcceptance(!termsAccepted)}
                className={classes.agreeButton}
                disabled={!isViewed}
              >
                accept
              </SubmitButton>
            </span>
          </Tooltip>
        )}
        <Typography variant="body2" component="p">
          Back to&nbsp;
          <Link href="/sign-up" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </AuthPage>
  );
};

export default Terms;
