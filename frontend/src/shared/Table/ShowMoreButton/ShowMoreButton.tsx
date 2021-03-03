import React, { FC } from 'react';
import { Grid, Button as MuiButton } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

export const SHOW_MORE_BUTTON_TITLE = 'Show More';

const Button = withStyles(() =>
  createStyles({
    root: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
      textTransform: 'capitalize',
    },
  }),
)(MuiButton);

interface ShowMoreButtonProps {
  onClick: () => void;
}

const ShowMoreButton: FC<ShowMoreButtonProps> = ({
  onClick,
}: ShowMoreButtonProps) => (
  <caption>
    <Grid justify="center" container item spacing={3}>
      <Button onClick={onClick}>{SHOW_MORE_BUTTON_TITLE}</Button>
    </Grid>
  </caption>
);

export default ShowMoreButton;
