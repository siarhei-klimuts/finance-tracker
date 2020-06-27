import Link from 'next/link';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import CollectionsIcon from '@material-ui/icons/Collections';

function AppDrawer(props) {
  return (
    <Drawer {...props}>
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemIcon><ArtTrackIcon /></ListItemIcon>
            <ListItemText primary="Operations" />
          </ListItem>
        </Link>
        <Link href="/categories">
          <ListItem button>
            <ListItemIcon><CollectionsIcon /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </Link>
        <Link href="/rules">
          <ListItem button>
            <ListItemIcon><ArtTrackIcon /></ListItemIcon>
            <ListItemText primary="Rules" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

export default AppDrawer;
