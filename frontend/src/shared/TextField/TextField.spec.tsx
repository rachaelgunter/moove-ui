import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import TextField, { TextFieldType } from './TextField';

const value = 'value';
const label = 'Label';

const onChangeMock = jest.fn();

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <TextField
        type={TextFieldType.PASSWORD}
        label={label}
        value={value}
        onChange={onChangeMock}
      />
    </ThemeProvider>,
  );

describe('TextField', () => {
  describe('PASSWORD type', () => {
    it('should have the correct visibility', () => {
      const wrapper = createWrapper();
      const input = wrapper.getByDisplayValue(value) as HTMLInputElement;
      const visibilityToggle = wrapper.getByTestId(
        'toggle-password-visibility',
      );

      expect(input.type).toBe(TextFieldType.PASSWORD);
      fireEvent.click(visibilityToggle);
      expect(input.type).toBe(TextFieldType.TEXT);
      fireEvent.click(visibilityToggle);
      expect(input.type).toBe(TextFieldType.PASSWORD);
    });
  });
});
