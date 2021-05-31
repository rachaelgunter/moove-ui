export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const getLinkToReportTool = (
  organizationName: string,
  environment: string | undefined,
): string => {
  const environmentAddon = environment ? `-${environment}` : '';
  return `https://${organizationName}-mrt${environmentAddon}.moove.ai`;
};
