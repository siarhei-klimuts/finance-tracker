import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function DashboardLayout({ operations, totals }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Paper>
          {operations}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          {totals}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardLayout;
