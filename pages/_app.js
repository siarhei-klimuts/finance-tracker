import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'theme';
import AuthProvider from 'lib/auth';
import Header from 'modules/Header';
import Drawer from 'modules/Drawer';

function App({ Component, pageProps }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Finance tracker</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Header onDrawerToggle={() => setDrawerOpen(!drawerOpen)} />
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;