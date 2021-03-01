/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */

import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import EditableLabel from './EditableLabel';

const value = 'value';
const onChangeMock = jest.fn();

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <EditableLabel onChange={onChangeMock} value={value} />
    </ThemeProvider>,
  );

const checkLabelAndButtonExistence = async (
  wrapper: RenderResult,
  exists: boolean,
) => {
  const fn = exists ? 'resolves' : 'rejects';

  await expect(wrapper.findByTestId('editable-label-label'))[fn].toBeDefined();
  await expect(wrapper.findByTestId('editable-label-button'))[fn].toBeDefined();
};

describe('EditableLabel', () => {
  it('should render a label with a button', async () => {
    const wrapper = createWrapper();

    await checkLabelAndButtonExistence(wrapper, true);
  });

  describe('edit button was clicked', () => {
    let wrapper: RenderResult;
    let button: HTMLElement;
    let input: HTMLElement;

    beforeEach(() => {
      wrapper = createWrapper();
      button = wrapper.getByTestId('editable-label-button');

      fireEvent.click(button);

      input = wrapper.getByTestId('editable-label-input');
    });

    it('should render an input', async () => {
      expect(input).toBeDefined();
      expect(input.firstChild).toHaveFocus();
      expect(input.firstChild?.textContent).toEqual(value);

      await checkLabelAndButtonExistence(wrapper, false);
    });

    describe('input lost focus', () => {
      it('should render a label with a button and trigger onChange', async () => {
        const newValue = 'new value';
        const textArea = input.firstChild;
        if (!textArea) {
          throw new Error('Textarea is not present');
        }

        expect(input).toBeDefined();
        await checkLabelAndButtonExistence(wrapper, false);

        fireEvent.change(textArea, { target: { value: newValue } });
        fireEvent.focusOut(textArea);

        expect(onChangeMock).toBeCalledWith(newValue);
        await checkLabelAndButtonExistence(wrapper, true);
      });
    });
  });
});
