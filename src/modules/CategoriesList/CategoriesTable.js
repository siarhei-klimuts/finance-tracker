import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { usePostData, useDeleteRequest } from 'lib/data';
import { mutate } from 'swr';

function SelectType({ category }) {
  const postCategory = usePostData(`/api/categories/${category._id}`);
  const handleChange = ({ target }) => {
    postCategory({
      ...category,
      type: target.value,
    }).then(() => mutate('/api/categories'));
  };

  return (
    <Select
      value={category.type || 'OTHER'}
      onChange={handleChange}
    >
      <MenuItem value="OTHER">OTHER</MenuItem>
      <MenuItem value="FIXED_INCOME">FIXED_INCOME</MenuItem>
      <MenuItem value="FIXED_EXPENSE">FIXED_EXPENSE</MenuItem>
      <MenuItem value="EXPENSE">EXPENSE</MenuItem>
    </Select>
  );
}

function DeleteButton({ categoryId }) {
  const deleteRequest = useDeleteRequest(`/api/categories/${categoryId}`);

  return (
    <Button
      onClick={() => deleteRequest().then(() => mutate('/api/categories'))}
    >
      Delete
    </Button>
  );
}

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type', render: (row) => <SelectType category={row} /> },
  { id: 'delete', render: (row) => <DeleteButton categoryId={row._id} /> },
];

function CategoriesTable({ data }) {
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (row) => (
            <TableRow key={row._id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.render ? column.render(row) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesTable;
