import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';

import {useRequest} from 'lib/data';

function UploadXmlReport({ onUploadResult }) {
  const handleDrop = useCallback((files) => {
    const data = new FormData();
    data.append("report", _.first(files));

    axios.post('/api/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(({data}) => onUploadResult(data))
  }, [onUploadResult]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: handleDrop,
    accept: 'text/xml',
  });

  // useEffect(() => {
  //   !_.isEmpty(data) && setAccount(data[0]._id);
  // }, [data]);

  return (
    <>
      {/* <Select value={account} onChange={({target: {value}}) => setAccount(value)}>
        {_.map(data, ({ _id, name }) => (
          <MenuItem key={_id} value={_id}>{name}</MenuItem>
        ))}
      </Select> */}

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button variant="contained" color="secondary">Select file</Button>
      </div>
    </>
  );
}

export default UploadXmlReport;
