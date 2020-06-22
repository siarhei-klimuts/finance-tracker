import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

import {useRequest} from 'lib/data';

const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'note', label: 'Note', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 50 },
  { id: 'category', label: 'Category', minWidth: 50, render: (row) => row.category ? row.category.name : 'None'},
];

export default function StickyHeadTable() {
  const { data = [], error } = useRequest('/api/operations');

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
