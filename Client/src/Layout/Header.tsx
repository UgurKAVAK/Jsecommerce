import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../Hooks/Hooks";

const links=[
  {title: "Home", to: "/"},
  {title: "Catalog", to: "/catalog"},
  {title: "About", to: "/about"},
  {title: "Contact", to: "/contact"},
  {title: "Error", to: "/error"},
]

const authLinks = [
  {title: "Login", to: "/login"},
  {title: "Register", to: "/register"}
]

const navStyles = {
  color:"inherit",
  textDecoration:"none",
  "&:hover":{
    color:"text.secondary"
  },
  "&.active":{
    color:"text.secondary"
  }
}

export default function Header(){
  const {card} = useAppSelector(state => state.card);
  const itemCount = card?.cardItems.reduce((total, item) => total + item.quantity, 0);
    return(
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar sx={{ display:"flex", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <Typography variant="h6">E-Commerce</Typography>
            <Stack direction="row">
              {links.map(links => <Button key={links.to} component={NavLink} to={links.to} sx={navStyles}>{links.title}</Button>)}
            </Stack>
          </Box>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <IconButton component={Link} to="/card" size="large" edge="start" color="inherit">
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Stack direction="row">
              {authLinks.map(links => <Button key={links.to} component={NavLink} to={links.to} sx={navStyles}>{links.title}</Button>)}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
