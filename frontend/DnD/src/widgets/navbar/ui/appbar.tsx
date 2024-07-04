import { AppBar as MaterialAppBar} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './drawer';
import { useState } from 'react';
import { useAuthReducer } from '@/features/auth';
import { Typography } from '@mui/material';
import { ProfileAppbarButton } from './appBarProfileButton';

function AppBarWithDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const openDrawer = () => setIsDrawerOpen(true);

  return <>
    <MaterialAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {document.title}    
        </Typography>
        <ProfileAppbarButton/>
      </Toolbar>
    </MaterialAppBar>
    <Drawer isOpen={isDrawerOpen} close={closeDrawer}/>
  </>
}

export default function AppBar() {

  const { state } = useAuthReducer(); 

  return <Box sx={{ flexGrow: 1 }}>
      {state.isAuthenticated && <AppBarWithDrawer/>}
    </Box>
}
