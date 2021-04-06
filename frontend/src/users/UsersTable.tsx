import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { User } from 'src/auth/UserProvider';
import Table from 'src/shared/Table';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import USERS_QUERY from './queries';
import UsersTableRow from './UsersTableRow';

const USERS_TABLE_MIN_HEIGHT = 600;
const COLUMNS = ['Name', 'Email', 'Role', 'Last Login', 'Created On', ''];

const UsersTable: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { loading, data, error } = useQuery(USERS_QUERY, {
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    },
  });

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item container>
        <TableOverlay
          height={USERS_TABLE_MIN_HEIGHT}
          loading={loading}
          error={!!error}
          data={data}
        >
          <Table
            columnNames={COLUMNS}
            hasPagination
            page={page}
            totalRows={data?.users?.totalCount}
            rowsPerPage={rowsPerPage}
            handlePageChange={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          >
            {data &&
              data?.users?.nodes.map((user: User) => (
                <UsersTableRow user={user} />
              ))}
          </Table>
        </TableOverlay>
      </Grid>
    </Grid>
  );
};

export default UsersTable;
