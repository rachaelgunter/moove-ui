import React, { FC } from 'react';
import { SvgIcon } from '@material-ui/core';

const MaximizeIcon: FC = (props) => {
  return (
    <SvgIcon style={{ width: '0.75em' }} viewBox="0 0 16 16" {...props}>
      <g fill="none" fillRule="evenodd">
        <g stroke="#FFF" strokeWidth="1.556">
          <g>
            <g>
              <g>
                <path
                  d="M3.889 0H1.556C.696 0 0 .696 0 1.556v2.333m14 0V1.556C14 .696 13.304 0 12.444 0h-2.333m0 14h2.333c.86 0 1.556-.696 1.556-1.556v-2.333m-14 0v2.333C0 13.304.696 14 1.556 14h2.333"
                  transform="translate(-1192 -62) translate(200 30) translate(984 24) translate(9 9)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default MaximizeIcon;
