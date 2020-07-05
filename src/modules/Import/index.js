import { useState } from 'react';
import Button from '@material-ui/core/Button';

import ImportDialog from './ImportDialog';
import ContextProvider from './context';

function Import() {
  const [open, setOpen] = useState(false);

  return (
    <ContextProvider>
      <Button color="inherit" onClick={() => setOpen(true)}>
        Import
      </Button>
      <ImportDialog open={open} onClose={() => setOpen(false)} />
    </ContextProvider>
  );
}

export default Import;