import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ProfileAppbarButton() {
    const navigate = useNavigate();

    const navigateToProfile = () => navigate("/profile");
  
    return  <IconButton 
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={navigateToProfile}
        color="inherit"
    >
        <AccountCircle />
    </IconButton>
}
  