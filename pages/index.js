import React from 'react'

import { useUser } from 'lib/auth';
import Header from 'modules/Header';
import Totals from 'modules/Totals';
import Table from 'Table';
import DashboardLayout from 'layouts/DashboardLayout';

function HomePage() {
  const user = useUser();

  return (
    <>
      <Header />
      {user ? (
        <DashboardLayout
          operations={<Table />}
          totals={<Totals />}
        />
      ) : 'Select user'}
    </>
  );
}

export default HomePage;
