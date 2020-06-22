import {useState, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CategoriesTable from './CategoriesTable';
import { useRequest, usePostData } from 'lib/data';

function CategoriesList() {
  const [name, setName] = useState('');
  const { data: categories, mutate } = useRequest('/api/categories');
  const postCategory = usePostData('/api/categories', {name});
  const handleSubmit = useCallback(() => {
    postCategory()
      .then(() => {
        mutate();
        setName('');
      });
  }, [postCategory, mutate, setName]);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Paper>
          <Grid container>
            <Grid item xs={6}>
              <TextField label="Name" value={name} onChange={({target}) => setName(target.value)} />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleSubmit} variant="contained">Add</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <CategoriesTable data={categories} />
      </Grid>
    </Grid>
  );
}

export default CategoriesList;
