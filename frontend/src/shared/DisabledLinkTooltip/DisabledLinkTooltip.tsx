import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import theme from 'src/app/styles';

interface DisabledLinkTooltipProps {
  isOrganisationMember: boolean;
  hasRoles: boolean;
  label: string;
}

const useStyles = makeStyles({
  root: {
    fontSize: 13,
  },
});

const BUY_PAID_ACCOUNT_URL = 'mailto:systems@moove.ai';

const DisabledLinkTooltip: FC<DisabledLinkTooltipProps> = ({
  isOrganisationMember,
  hasRoles,
  label,
}: DisabledLinkTooltipProps) => {
  const classes = useStyles();

  if (!hasRoles) {
    return (
      <div className={classes.root} data-testid={`tooltip__${label}`}>
        {label}
        <br />
        <br />
        Contact us{' '}
        <a
          style={{ color: theme.palette.secondary.main }}
          href={BUY_PAID_ACCOUNT_URL}
        >
          contact@moove.ai
        </a>
      </div>
    );
  }
  if (!isOrganisationMember) {
    return <>You have to be an organization member to view this section</>;
  }

  return <></>;
};

export default DisabledLinkTooltip;
