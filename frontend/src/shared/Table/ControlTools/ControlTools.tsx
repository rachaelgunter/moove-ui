import React, { FC } from 'react';
import { TableRow } from '@material-ui/core';

import TableCell from '../TableCell';
import Button from '../Button';

export const SHOW_MORE_BUTTON_TITLE = 'Show More';
export const SHOW_LESS_BUTTON_TITLE = 'Show Less';

interface ShowMoreButtonProps {
  onShowMoreClick: () => void;
  onShowLessClick: () => void;
  colSpan: number;
}

const ControlTools: FC<ShowMoreButtonProps> = ({
  onShowMoreClick,
  onShowLessClick,
  colSpan,
}: ShowMoreButtonProps) => (
  <TableRow key="table-control-row">
    <TableCell align="center" colSpan={colSpan}>
      <Button onClick={onShowMoreClick}>{SHOW_MORE_BUTTON_TITLE}</Button>
      <Button onClick={onShowLessClick}>{SHOW_LESS_BUTTON_TITLE}</Button>
    </TableCell>
  </TableRow>
);

export default ControlTools;
