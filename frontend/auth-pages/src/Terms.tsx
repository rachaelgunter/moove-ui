import React, { FC } from 'react';
import { Typography, makeStyles, Theme, Box } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import Link from './Link';

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
}));

const Terms: FC = () => {
  const classes = useStyles();
  const { root } = classes;

  return (
    <AuthPage size="large">
      <Box className={classes.container}>
        <Typography
          classes={{ root }}
          className={classes.title}
          variant="body2"
          component="p"
        >
          What is Lorem Ipsum?
        </Typography>
        <Typography classes={{ root }} variant="body2" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
        <Typography
          classes={{ root }}
          className={classes.title}
          variant="body2"
          component="p"
        >
          Where does it come from?
        </Typography>
        <Typography classes={{ root }} variant="body2" component="p">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of
          Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
          the theory of ethics, very popular during the Renaissance. The first
          line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes
          from a line in section 1.10.32. The standard chunk of Lorem Ipsum used
          since the 1500s is reproduced below for those interested. Sections
          1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et Malorum&quot; by
          Cicero are also reproduced in their exact original form, accompanied
          by English versions from the 1914 translation by H. Rackham.
        </Typography>
        <Typography
          classes={{ root }}
          className={classes.title}
          variant="body2"
          component="p"
        >
          Why do we use it?
        </Typography>
        <Typography classes={{ root }} variant="body2" component="p">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using &quot;Content here, content here&quot;,
          making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for &quot;lorem ipsum&quot; will uncover many web sites
          still in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </Typography>
        <Typography
          classes={{ root }}
          className={classes.title}
          variant="body2"
          component="p"
        >
          Where can I get some?
        </Typography>
        <Typography classes={{ root }} variant="body2" component="p">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn&apos;t anything embarrassing hidden in the middle
          of text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </Typography>
      </Box>
      <Footer justify="flex-end">
        <Typography variant="body2" component="p">
          Back to&nbsp;
          <Link href="/sign-up" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Footer>
    </AuthPage>
  );
};

export default Terms;
