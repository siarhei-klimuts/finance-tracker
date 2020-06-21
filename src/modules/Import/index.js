import { useState } from 'react';
import Button from '@material-ui/core/Button';

import ImportDialog from './ImportDialog';

function Import() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="inherit" onClick={() => setOpen(true)}>
        Import
      </Button>
      <ImportDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Import;