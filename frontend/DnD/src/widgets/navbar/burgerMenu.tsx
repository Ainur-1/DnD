import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './drawer';
import { useState } from 'react';
import { useAuthReducer } from '@/features/auth';

function AppBarWithDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const openDrawer = () => setIsDrawerOpen(true);

  return <>
    <AppBar position="static">
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
      </Toolbar>
    </AppBar>
    <Drawer isOpen={isDrawerOpen} close={closeDrawer}/>
  </>
}

export default function BurgerMenu() {

  const { state } = useAuthReducer(); 

  return <Box sx={{ flexGrow: 1 }}>
      {state.isAuthenticated && <AppBarWithDrawer/>}
    </Box>
}
