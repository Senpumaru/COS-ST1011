import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Home from "../Screens/Home";
import Sidebar from "./Navigation/Sidebar";
import { Redirect, Route, Switch, useHistory, useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import Login from "../Screens/Account/Login";
import Dashboard from "../Screens/Cases/Dashboard";
import { PowerSettingsNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutAccount } from "../Store/Slices/accountSlice";

const drawerWidth = 220;

function Interface(props) {
  const { window, page } = props;

  /* Redux Toolkit */
  const dispatch = useDispatch();
  const { Info, Loading, Error, Success } = useSelector((state) => state.Account);

  /*** React Router Dom ***/
  const history = useHistory();

  let { path, url } = useRouteMatch();

  /** Logout **/
  const logoutHandler = () => {
    dispatch(logoutAccount());
    history.push("/login");
  };

  // Drawer - Responsive
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={0}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap component="div">
              COS | ИГХ:PD-L1
            </Typography>

            {Info ? (
              <React.Fragment>
                <Button sx={{ display: { md: "block", xs: "none" } }} color="inherit">
                  {Info["first_name"]} {Info["last_name"]}{" "}
                </Button>
                <Button onClick={logoutHandler} color="inherit" endIcon={<PowerSettingsNew />}>
                  Выйти
                </Button>
                <Button color="inherit">
                  <strong>RU</strong>
                </Button>
              </React.Fragment>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
    </React.Fragment>
  );
}

export default Interface;
