import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
  Tab,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCases,
  statisticsCases,
} from "../../../actions/Services/ST0001/CaseActions";
import CreationFormAccess from "../../../components/Services/ST0001/Forms/CreationFormAccess";
import Statistics from "../../../components/Services/ST0001/Statistics";
import CaseTable from "../../../components/Services/ST0001/Tables/Public/Table";

/*** Material UI Styles ***/
const useStyles = makeStyles({
  appTitle: {
    fontSize: 20,
    fontWeight: 600,
    paddingTop: "1rem",
  },
});

function Dashboard() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();

  const caseCreate = useSelector((state) => state.ALK["caseCreate"]);
  const { successCreate } = caseCreate;

  const caseTransfer = useSelector((state) => state.ALK["caseTransfer"]);
  const { successTransfer } = caseTransfer;

  const approvalUpdate = useSelector((state) => state.ALK["approvalUpdate"]);
  const { successApproval } = approvalUpdate;

  const searchParameters = useSelector(
    (state) => state.ALK["searchParameters"]
  );
  const { page, pageSize, sortColumn, filters } = searchParameters;

  /*** React Effects ***/
  // Tabs
  const [tabValue, setTabValue] = React.useState("Cases");

  const handleTabValue = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  /* Table Search */
  useEffect(() => {
    dispatch(
      listCases(
        page,
        pageSize,
        sortColumn,
        filters.dateRegisterGTE.toISOString().split("T")[0],
        filters.dateRegisterLTE.toISOString().split("T")[0],
        filters.institution
      )
    );
  }, [
    page,
    pageSize,
    sortColumn,
    filters,
    successCreate,
    successTransfer,
    successApproval,
  ]);

  /* Statistics */
  useEffect(() => {
    dispatch(statisticsCases());
  }, []);

  return (
    <React.Fragment>
      <Typography className={classes.appTitle}>ИГХ: ALK</Typography>
      <TabContext value={tabValue}>
        <TabList onChange={handleTabValue} aria-label="Menu">
          <Tab label="Кейсы" value="Cases" />
          <Tab label="Статистика" value="Statistics" />
          <Tab
            label={
              <Badge color="secondary" badgeContent={22}>
                Личный кабинет
              </Badge>
            }
            value="Cabinet"
          />
        </TabList>
        <TabPanel value="Cases">
          <CreationFormAccess />
          <CaseTable />
        </TabPanel>
        <TabPanel value="Statistics">
          <Statistics />
        </TabPanel>
        <TabPanel value="Cabinet">...</TabPanel>
      </TabContext>
    </React.Fragment>
  );
}

export default Dashboard;
