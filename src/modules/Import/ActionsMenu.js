import { useState, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useActions } from './context';

function ActionsMenu({ uuid }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { deleteOperation } = useActions();

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleDelete = useCallback(() => {
    handleClose();
    deleteOperation(uuid);
  }, [handleClose, deleteOperation, uuid]);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default ActionsMenu;
