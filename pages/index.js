import Totals from 'modules/Totals';
import Table from 'Table';
import DashboardLayout from 'layouts/DashboardLayout';

function HomePage() {
  return (
    <DashboardLayout
      operations={<Table />}
      totals={<Totals />}
    />
  );
}

export default HomePage;
