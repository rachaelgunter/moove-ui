import { CSSProperties } from '@material-ui/styles';
import React, { FC } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const PreviewSegmentTabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  const getStyles = (): CSSProperties => {
    return value === index ? { flex: 1, height: '100%', display: 'flex' } : {};
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      style={getStyles()}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

PreviewSegmentTabPanel.defaultProps = {
  children: null,
};

export default PreviewSegmentTabPanel;
