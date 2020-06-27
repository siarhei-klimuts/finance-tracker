import { useState } from 'react';
import _ from 'lodash';
import { mutate } from 'swr';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useRequest, usePostData } from 'lib/data';

function CategoryCell({ operation }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: categories } = useRequest('/api/categories');
  const postOperation = usePostData(`/api/operations/${operation._id}`);
  const handleCategoryChange = (category) => {
    setAnchorEl(null);
    postOperation({ category })
      .then(() => mutate('/api/operations'));
  };

  return (
    <>
      <Button onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
        {operation.category ? operation.category.name : 'None'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {_.map(categories, ({ _id, name }) => (
          <MenuItem onClick={() => handleCategoryChange(_id)}>{name}</MenuItem>
        ))}
      </Menu>
    </>
  );
}

const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'note', label: 'Note', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 50 },
  {
    id: 'category', label: 'Category', minWidth: 50, render: (row) => <CategoryCell operation={row} />,
  },
];

export default function StickyHeadTable() {
  const { data = [] } = useRequest('/api/operations');

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(data, (row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.render ? column.render(row) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
