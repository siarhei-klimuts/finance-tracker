import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash';
import moment from 'moment';

import {useRequest} from 'lib/data';

const columns = [
  {id: 'month'},
  {id: 'income'},
  {id: 'expense'},
];

function Totals() {
  const {data: operations} = useRequest('/api/operations');
  const data =_(operations)
    .groupBy(({date}) => moment(date).month())
    .mapValues((group, month) => ({
      month,
      income: _.round(_.sumBy(group, ({amount, type}) => type === 'income' ? amount : 0), 2),
      expense: _.round(_.sumBy(group, ({amount, type}) => type === 'expense' ? amount : 0), 2),
    }))
    .values()
    .value();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((columns) => (
              <TableCell key={columns.id}>
                {columns.id}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.month}>
              {columns.map((columns) => (
                <TableCell key={columns.id}>
                  {row[columns.id]}
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
