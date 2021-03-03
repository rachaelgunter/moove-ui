import React, { FC } from 'react';
import { Button as MuiButton, TableRow } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

import TableCell from '../TableCell';

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
  colSpan: number;
}

const ShowMoreButton: FC<ShowMoreButtonProps> = ({
  onClick,
  colSpan,
}: ShowMoreButtonProps) => (
  <TableRow key="table-control-row">
    <TableCell align="center" colSpan={colSpan}>
      <Button onClick={onClick}>{SHOW_MORE_BUTTON_TITLE}</Button>
    </TableCell>
  </TableRow>
);

export default ShowMoreButton;
