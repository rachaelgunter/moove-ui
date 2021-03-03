import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import theme from 'src/app/styles';

import CreateDatasetDialog, {
  DESCRIPTION_MAX_LENGTH_ERROR,
} from './CreateDatasetDialog';

describe('CreateDatasetDialog', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <ThemeProvider theme={theme}>
        <CreateDatasetDialog open onClose={() => {}} />
      </ThemeProvider>,
    );
  });

  describe('description error message', () => {
    let descriptionField: HTMLElement;
    const longText = '#'.repeat(20000);

    const getErrorMessage = () => {
      return wrapper.queryByText(DESCRIPTION_MAX_LENGTH_ERROR);
    };

    beforeEach(() => {
      descriptionField = wrapper.getByLabelText('Description');
    });

    it('should appear when user enters too long text', () => {
      fireEvent.change(descriptionField, {
        target: { value: longText },
      });

      const errorMessage = getErrorMessage();
      expect(errorMessage).toBeDefined();
    });

    it('should disappear when user erases long text', () => {
      fireEvent.change(descriptionField, {
        target: { value: longText },
      });
      let errorMessage = getErrorMessage();
      expect(errorMessage).toBeDefined();

      fireEvent.change(descriptionField, {
        target: { value: 'text' },
      });
      errorMessage = getErrorMessage();
      expect(errorMessage).toBeNull();
    });
  });
});
