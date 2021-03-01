import React, { useState } from 'react';
import { Grid, InputBase, InputBaseProps } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import IconButton from 'src/shared/IconButton';
import Typography, { TypographyProps } from 'src/shared/Typography';

interface EditableLabelProps {
  value: string;
  onChange: (value: string) => void;
  labelTypographyProps?: TypographyProps;
  inputProps?: InputBaseProps;
}

const EditableLabel: React.FC<EditableLabelProps> = ({
  value,
  onChange,
  labelTypographyProps,
  inputProps,
}: EditableLabelProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(value);

  const onBlur = () => {
    setEditing(false);
    onChange(currentValue);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onBlur();
    }
  };

  if (isEditing) {
    return (
      <InputBase
        data-testid="editable-label-input"
        value={currentValue}
        onChange={(event) => setCurrentValue(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        margin="dense"
        fullWidth
        multiline
        autoFocus
        {...inputProps}
      />
    );
  }

  return (
    <Grid container spacing={1} wrap="nowrap">
      <Grid item xs>
        <Typography
          data-testid="editable-label-label"
          {...labelTypographyProps}
        >
          {value}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          data-testid="editable-label-button"
          onClick={() => setEditing(true)}
        >
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

EditableLabel.defaultProps = {
  labelTypographyProps: {},
  inputProps: {},
};

export default EditableLabel;
