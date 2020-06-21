import {useState, useMemo} from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import UploadXmlReport from './UploadXmlReport';
import Table from './Table';
import {useRequest, usePostData} from 'lib/data';

function categorize(records, rules, account) {
  return _.map(records, (item) => {
    const found =_.find(rules, ({value}) => _.includes(item.note, value));
    return found ? {
      ...item,
      category: found.category._id,
      account,
    } : item;
  });
}

function ImportDialog({ open, onClose }) {
  const {data: rules} = useRequest('/api/rules');
  const {data: accounts} = useRequest('/api/accounts');
  const [parsedData, setParsedData] = useState();
  const [account, setAccount] = useState('');
  const categorizedRecords = useMemo(() => categorize(parsedData, rules, account), [parsedData, rules, account]);
  const postOperations = usePostData('/api/operations', categorizedRecords);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Import operations</DialogTitle>
      <DialogContent>
        <Table items={categorizedRecords} />
      </DialogContent>
      <DialogActions>
        <Select value={account} onChange={({target: {value}}) => setAccount(value)}>
          {_.map(accounts, ({ _id, name }) => (
            <MenuItem key={_id} value={_id}>{name}</MenuItem>
          ))}
        </Select>

        <Button onClick={onClose}>Close</Button>
        <UploadXmlReport onUploadResult={setParsedData} />
        <Button
          variant="contained"
          color="primary"
          onClick={postOperations}
          disabled={_.isEmpty(categorizedRecords) || _.isEmpty(account)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportDialog;