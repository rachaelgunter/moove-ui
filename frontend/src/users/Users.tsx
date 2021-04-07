import React from 'react';

import PageTemplate from 'src/shared/PageTemplate';
import UsersTable from './UsersTable';

const Users: React.FC = () => {
  return (
    <PageTemplate title="User Management">
      <UsersTable />
    </PageTemplate>
  );
};

export default Users;
