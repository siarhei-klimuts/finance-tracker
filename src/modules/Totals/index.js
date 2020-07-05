import { useMemo } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash';
import moment from 'moment';

import { useRequest } from 'lib/data';

const columns = [
  { id: 'month', render: (row) => moment(row.month, 'M').format('MMMM') },
  { id: 'FIXED_INCOME' },
  { id: 'FIXED_EXPENSE' },
  { id: 'EXPENSE' },
];

function Totals() {
  const { data: operations } = useRequest('/api/operations');
  const { data: categories } = useRequest('/api/categories');
  const categoriesById = useMemo(() => _.keyBy(categories, '_id'), [categories]);

  const data = _(operations)
    .groupBy(({ date }) => moment(date, 'YYYY-MM-DD').month() + 1)
    .mapValues((group, month) => ({
      month,
      FIXED_INCOME: _.round(_.sumBy(group, ({ amount, category }) => (_.get(categoriesById[category], 'type') === 'FIXED_INCOME' ? amount : 0)), 2),
      FIXED_EXPENSE: _.round(_.sumBy(group, ({ amount, category }) => (_.get(categoriesById[category], 'type') === 'FIXED_EXPENSE' ? amount : 0)), 2),
      EXPENSE: _.round(_.sumBy(group, ({ amount, category }) => (_.get(categoriesById[category], 'type') === 'EXPENSE' ? amount : 0)), 2),
    }))
    .values()
    .value();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.id}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.month}>
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

export default Totals;
