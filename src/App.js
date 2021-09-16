import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/Theme";
import { CssBaseline, Toolbar } from "@mui/material";
import Interface from "./Components/Interface";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router";
import Login from "./Screens/Account/Login";
import { useSelector } from "react-redux";
import Home from "./Screens/Home";
import Dashboard from "./Screens/Cases/Dashboard";
import { Box } from "@mui/system";

// Axios CSRF security
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function App() {
  const { Info, Loading, Error } = useSelector((state) => state.Account);

  const DefaultContainer = () => (
    <div>
      <Box sx={{ display: "flex" }}>
        <Interface />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Toolbar />
          <Route path="/menu">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Box>
      </Box>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            {/* Page - Login */}
            <Route path="/login">
              <Login />
            </Route>

            {/* Page - Main */}
            <Route component={DefaultContainer} />

            {/* Page - Error */}
            <Route render={() => <Redirect to={{ pathname: "/Error" }} />} />
          </Switch>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
