import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


const Link = styled(RouterLink)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    }
  }));

export default Link;