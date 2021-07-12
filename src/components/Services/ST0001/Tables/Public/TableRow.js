import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ListItemIcon,
  Radio,
  RadioGroup,
  Snackbar,
  TableCell,
  Tooltip,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import SyncIcon from "@material-ui/icons/Sync";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  approvalUpdateAction,
  caseTransferAction,
} from "../../../../../actions/Services/ST0001/CaseActions";
import Extension from "./Row/Extension";
import ListAltIcon from "@material-ui/icons/ListAlt";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useRowStyles = makeStyles({
  tableRow: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableCell: {
    padding: 4,
  },
  tableButton: {
    padding: 0,
  },
  icons: {
    padding: 2,
    fontSize: "2rem",
  },
  formControl: {
    minWidth: 100,
  },
  dialogTitle: {
    fontSize: "1.8rem",
    backgroundColor: "#F2AA4CFF",
  },
});

function RowExpansion(props) {
  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Redux States ***/

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.User["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ALK["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  /*** Row components ***/
  /* Row Expansion */
  const { row } = props;

  // Local State
  const [openRow, setOpenRow] = useState(false);

  const caseExpand = (event) => {
    setOpenRow(!openRow);
  };

  // Case Transfer
  const [openTransferDialog, setOpenTransferDialog] = useState(false);

  const handleOpenTransferDialog = () => {
    setOpenTransferDialog(true);
  };

  const handleCloseTransferDialog = () => {
    setOpenTransferDialog(false);
  };

  const [openTransferAlert, setOpenTransferAlert] = useState(false);

  const handleTransferWindowClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenTransferAlert(false);
  };

  function caseTransfer(uuid) {
    setOpenTransferAlert(true);
    setOpenTransferDialog(false);
    const data = {};
    data["uuid"] = uuid;
    data["caseAssistant"] = userLogin["userInfo"].id;
    dispatch(caseTransferAction(data));
  }

  /*** Actions ***/
  /* Editing */
  // Editor
  var EditorExists = false;
  if (row?.case_editor) {
    EditorExists = userInfo.id === row?.case_editor?.id;
  } else {
    EditorExists = false;
  }

  var editingAction = false;
  if (
    userInfo.credentials_status["Pathologist"] === true &&
    EditorExists === true &&
    approvalsTrue != true
  ) {
    editingAction = true;
  } else if (
    userInfo.credentials_status["Registrator"] === true &&
    (userInfo.id === row?.case_creator?.id ||
      userInfo.id === row?.case_assistant?.id) &&
    row?.clinical_interpretation === null
  ) {
    editingAction = true;
  } else if (
    userInfo.credentials_status["Clinician"] === true &&
    userInfo.id === row?.case_creator?.id &&
    row?.case_assistant?.id === null
  ) {
    editingAction = true;
  } else {
    editingAction = false;
  }

  /* Case Approval */
  var approvalsTrue = false;
  if (row.case_approvals.length > 0) {
    if (row.case_approvals) {
      approvalsTrue = row?.case_approvals
        ?.map((a) => a.approval)
        .every(function (e) {
          return e === true;
        });
    } else {
      approvalsTrue = false;
    }
  }

  const [openApprovalAlert, setOpenApprovalAlert] = React.useState(false);
  // Check if case is approved already
  var checkApprovalConsulant = row.case_approvals.filter((obj) => {
    return obj.consultant === userInfo.id;
  });

  var checkApproval = checkApprovalConsulant[0]?.approval;

  const handleOpenApproveAlert = () => {
    setOpenApprovalAlert(true);
  };

  const handleCloseApproveAlert = () => {
    setOpenApprovalAlert(false);
  };

  const [approvalChoice, setApprovalChoice] = useState("");

  const handleApprovalChoice = (event) => {
    setApprovalChoice(event.target.value);
  };

  const approveCase = () => {
    const data = {};
    data["id"] = checkApprovalConsulant[0]?.id;

    data["approvalChoice"] = approvalChoice;
    dispatch(approvalUpdateAction(data));
    setOpenApprovalAlert(false);
  };

  // PDF Report
  const handleCasePDF = (event) => {
    window.open(`http://127.0.0.1:8000/api/ST0001/cases/${row.uuid}/pdf/`);
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        className={classes.tableCell}
        className={classes.tableRow}
        id={row.uuid}
      >
        <TableCell className={classes.tableCell}>
          <IconButton aria-label="expand row" size="small" onClick={caseExpand}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className={classes.tableCell} align="left">
          {row.date_of_registration}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.case_code}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.date_of_report}
        </TableCell>
        
        <TableCell className={classes.tableCell} align="left">
          {row.clinical_interpretation}
        </TableCell>
        {row ? (
          <TableCell className={classes.tableCell} align="left">
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              spacing={0}
            >
              <Grid item>
                {userInfo.credentials_status["Consultant"] &&
                  row.case_approvals
                    .map((a) => a.consultant)
                    .includes(userInfo.id) && row.clinical_interpretation != null &&
                  (
                    <IconButton
                      className={classes.tableButton}
                      onClick={() => handleOpenApproveAlert()}
                    >
                      <Tooltip title="Утверждение" aria-label="transfer">
                        <PriorityHighIcon className={classes.icons} />
                      </Tooltip>
                    </IconButton>
                  )}
              </Grid>
              <React.Fragment>
                <Dialog
                  open={openApprovalAlert}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    className={classes.dialogTitle}
                    id="alert-dialog-title"
                  >
                    {"Утверждение кейса"}
                    <IconButton
                      aria-label="close"
                      className={classes.icons}
                      onClick={handleCloseApproveAlert}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Это окно предназначено для утверждение кейса, для
                      последующего создания отчета
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <FormLabel component="legend">Выбор</FormLabel>
                    <RadioGroup
                      aria-label="approval"
                      name="approval"
                      value={approvalChoice}
                      onChange={handleApprovalChoice}
                    >
                      <Grid container>
                        <Grid>
                          <FormControlLabel
                            value={"Yes"}
                            control={<Radio />}
                            label="Утверждаю"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value={"No"}
                            control={<Radio />}
                            label="Не утверждаю"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                    <Button
                      onClick={approveCase}
                      color="secondary"
                      variant="contained"
                    >
                      Ответ
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
              <Grid item>
                {userInfo.credentials_status["Registrator"] &&
                  row.case_creator?.credentials_status?.Clinician &&
                  row?.case_assistant === null && (
                    <IconButton
                      className={classes.tableButton}
                      onClick={handleOpenTransferDialog}
                    >
                      <Tooltip title="Трансфер кейса" aria-label="transfer">
                        <SyncIcon className={classes.icons} />
                      </Tooltip>
                    </IconButton>
                  )}
              </Grid>
              <React.Fragment>
                <Dialog
                  open={openTransferDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    className={classes.dialogTitle}
                    id="transfer-dialog-title"
                  >
                    {"Трансфер кейса"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Вы хотите произвести трансфер кейса (стать ассистентом)
                      клинициста:
                      <strong>
                        {" "}
                        {row.case_creator["last_name"] +
                          " " +
                          row.case_creator["first_name"]}
                      </strong>
                      ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseTransferDialog} variant="outlined" color="primary">
                      Отмена
                    </Button>
                    <Button
                      onClick={() => caseTransfer(row.uuid)}
                      variant="outlined"
                      color="primary"
                      autoFocus
                    >
                      Произвести трансфер
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={openTransferAlert}
                autoHideDuration={6000}
                onClose={handleTransferWindowClose}
                message="Трансфер кейса произведен."
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleTransferWindowClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
              <Grid item>
                {editingAction && (
                  <IconButton
                    className={classes.tableButton}
                    component={Link}
                    to={`/ST0001/Case/${row.uuid}`}
                  >
                    <Tooltip title="Обновить" aria-label="edit">
                      <EditIcon className={classes.icons} />
                    </Tooltip>
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {row.clinical_interpretation != null && row.case_consultants.length > 0 && (
                  <IconButton
                    className={classes.tableButton}
                    component={Link}
                    to={`/ST0001/Case/Review/${row.uuid}`}
                  >
                    <Tooltip title="Обзор кейса" aria-label="edit">
                      <ListAltIcon className={classes.icons} />
                    </Tooltip>
                  </IconButton>
                )}
              </Grid>

              <Grid item>
                
                  <IconButton className={classes.tableButton} component={Link}
                  to={`/ST0001/Case/${row.institution_code}/${row.order_number}/Archive/`}>
                    <Tooltip title="Архивы" aria-label="edit">
                      <FindInPageIcon className={classes.icons} />
                    </Tooltip>
                  </IconButton>
              </Grid>
              
            </Grid>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          className={classes.tableCell}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
        >
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Extension row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default RowExpansion;
