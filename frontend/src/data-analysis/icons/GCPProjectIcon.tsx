import { SvgIcon } from '@material-ui/core';
import React, { FC } from 'react';

const GCPProjectIcon: FC = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M14.44 16.95L11.584 12l2.854-5.032h5.706L23 11.998l-2.854 4.95H14.44zM3.853 22.94L1 17.99l2.854-5.03H9.56l2.855 5.03-2.854 4.95h-5.7zm0-11.98L1 6.03 3.854 1H9.56l2.855 5.032L9.56 10.96H3.855z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};

export default GCPProjectIcon;
