import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from './components/Menu/Header/AppBar';
import UpdateFormST0001 from './components/Services/ST0001/Forms/UpdateForm.js';
import UpdateFormST0002 from './components/Services/ST0002/Forms/UpdateForm.js';
import theme from "./components/Theme/Theme";
import ErrorScreen from './screens/Account/ErrorScreen';
import LoginScreen from './screens/Account/LoginScreen';
import Reg from './screens/Account/Reg';
import Dashboard from './screens/Dashboard.js';
import CaseArchive from './screens/Services/ST0001/CaseArchive';
import CaseReview from './screens/Services/ST0001/CaseReview';
import ST0001 from './screens/Services/ST0001/Dashboard.js';
import ST0002 from './screens/Services/ST0002/Dashboard.js';

/*** Material UI Styles Override ***/
const useStyles = makeStyles(theme => ({
  app: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

function AppProtectedRoute({ application: App, component: Component, ...rest }) {

  const userLogin = useSelector(state => state.User["userLogin"])
  const { loading, error, userInfo } = userLogin

  return (
    <Route {...rest} render={
      (props) => {
        if (userInfo != null) {

          switch (App) {
            case "ST0001":
              if (userInfo["application_rights"]["ST0001"] === true) {
                return <Component {...props} />

              } else {
                return <Redirect to="/Error" />
              }
            case "ST0002":
              if (userInfo["application_rights"]["ST0002"] === true) {
                return <Component {...props} />

              } else {
                return <Redirect to="/Error" />
              }
            default:
              return <Component {...props} />
          }
        } else {
          return <Redirect to="/Login" />
        }
      }
    } />
  )
}

function App() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          
          <Route path='/Register' component={Reg} />
          <Route path="/Login" component={LoginScreen} />
          <Route path="/Error" component={ErrorScreen} />
          {/* URL Error screen for invalid URL  */}
          
          <React.Fragment>
            <div className={classes.app}>
              <Header />
              <main className={classes.content}>
                <Toolbar />
                <AppProtectedRoute exact path="/" component={Dashboard} />
                <AppProtectedRoute exact path="/ST0001" application="ST0001" component={ST0001} />
                <AppProtectedRoute exact path="/ST0001/Case/:id" application="ST0001" component={UpdateFormST0001} />
                <AppProtectedRoute exact path="/ST0001/Case/Review/:id" application="ST0001" component={CaseReview} />
                <AppProtectedRoute exact path="/ST0001/Case/:code/:number/Archive" application="ST0001" component={CaseArchive} />
                <AppProtectedRoute path="/ST0002" application="ST0002" component={ST0002} />
                <AppProtectedRoute path="/ST0002/Case/:id" application="ST0002" component={UpdateFormST0002} />
              </main>
            </div>
          </React.Fragment>
          <Route render={() => <Redirect to={{pathname: "/Error"}} />} /> 
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;