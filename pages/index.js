import Totals from 'modules/Totals';
import Operations from 'modules/Operations';
import DashboardLayout from 'layouts/DashboardLayout';

function HomePage() {
  return (
    <DashboardLayout
      operations={<Operations />}
      totals={<Totals />}
    />
  );
}

export default HomePage;
