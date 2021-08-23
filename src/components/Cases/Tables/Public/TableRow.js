import { faUserMd, faMailBulk, faEdit, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
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
import FindInPageIcon from "@material-ui/icons/FindInPage";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SyncIcon from "@material-ui/icons/Sync";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { approvalUpdateAction, caseAddendumAction, caseTransferAction } from "../../../../actions/Cases/CaseActions";
import DialogApproval from "../../../Dialogs/DialogApproval.js";
import DialogAddendum from "../../../Dialogs/DialogAddendum.js";
import DialogTransfer from "../../../Dialogs/DialogTransfer.js";
import Extension from "./Row/Extension";

/*** Material UI Styles ***/
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

const SERVER_URL = process.env.REACT_APP_API_SERVER;

function RowExpansion(props) {
  const { row } = props;

  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Redux States ***/

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ST1011["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  /*** Row components ***/
  /* Row Expansion */

  // Local State
  const [openRow, setOpenRow] = useState(false);

  const caseExpand = (event) => {
    setOpenRow(!openRow);
  };

  /*** Actions ***/
  /* Editing */
  // Editor
  var editorExists = false;
  if (row?.case_editor) {
    editorExists = userInfo.id === row?.case_editor?.id;
  } else {
    editorExists = false;
  }
  
  // Access
  var editingAction = false;
  if (row?.version_state === "In-progress" && row.decline_status === false) {
    if (editorExists === true && approvalsTrue != true) {
      editingAction = true;
    } else if (
      (userInfo.id === row?.case_creator?.id || userInfo.id === row?.case_assistant?.id) &&
      row?.clinical_interpretation === null
    ) {
      editingAction = true;
    } else if (
      userInfo["credentials"]["clinician"] === true &&
      userInfo.id === row?.case_creator?.id &&
      row?.case_assistant?.id === null
    ) {
      editingAction = true;
    } else {
      editingAction = false;
    }
  } else {
    editingAction = false;
  }
  

  /** Case Approval **/
  // Access
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

  // State
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  // Open Dialogue
  const handleOpenApproveDialog = () => {
    setOpenApprovalDialog(true);
  };

  /** Case Transfer **/
  // State
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  // Open Dialogue
  const handleOpenTransferDialog = () => {
    setOpenTransferDialog(true);
  };
  // Snackbar

  /** Case Addendum **/
  // State
  const [openAddendumDialog, setOpenAddendumDialog] = useState(false);
  // Open Dialogue
  const handleOpenAddendumDialog = () => {
    setOpenAddendumDialog(true);
  };

  return (
    <React.Fragment>
      <TableRow hover className={classes.tableCell} className={classes.tableRow} id={row.uuid}>
        <TableCell className={classes.tableCell}>
          <IconButton aria-label="expand row" size="small" onClick={caseExpand}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className={classes.tableCell} align="left">
          {row.date_of_acquisition}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.personal_number}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.date_of_report}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.clinical_interpretation}
        </TableCell>

        {row ? (
          <React.Fragment>
            <TableCell className={classes.tableCell} style={{ width: "8%" }} align="center">
              <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                <Grid item>
                  {row.case_editor === null && (
                    <Tooltip title="Не указан патолог" aria-label="editor">
                      <Icon className={classes.tableIcon}>
                        <FontAwesomeIcon icon={faUserMd} />
                      </Icon>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  {row?.case_approvals.length === 0 && (
                    <Tooltip title="Нет консультантов" aria-label="consultants">
                      <Icon className={classes.tableIcon}>
                        <FontAwesomeIcon icon={faUsers} />
                      </Icon>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </TableCell>

            <TableCell className={classes.tableCell} style={{ width: "14%" }} align="left">
              <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                <Grid item>
                  {row.case_approvals.map((a) => a.consultant).includes(userInfo.id) &&
                    row.clinical_interpretation != null &&
                    row.version_state === "In-progress" && (
                      <Tooltip title="Утверждение" aria-label="transfer">
                        <IconButton className={classes.tableButton} onClick={() => handleOpenApproveDialog()}>
                          <PriorityHighIcon className={classes.icons} />
                        </IconButton>
                      </Tooltip>
                    )}
                </Grid>
                {
                  // Objective: CASE Approval
                  // Rule: CASE APPROVALS exist
                  row.case_approvals && (
                    <DialogApproval
                      openApprovalDialog={openApprovalDialog}
                      setOpenApprovalDialog={setOpenApprovalDialog}
                      approvals={row.case_approvals}
                    />
                  )
                }

                {
                  // Objective: CASE Addendum
                  // Rule #1: CASE EDITOR exists
                  // Rule #2: CASE Verified
                  row.version_state === "Verified" && editorExists && (
                    <Grid item>
                      <Tooltip title="Поправка" aria-label="modify">
                        <IconButton className={classes.tableButton} onClick={handleOpenAddendumDialog}>
                          <RateReviewIcon className={classes.icons} />
                        </IconButton>
                      </Tooltip>

                      <DialogAddendum
                        openAddendumDialog={openAddendumDialog}
                        setOpenAddendumDialog={setOpenAddendumDialog}
                        // Data
                        uuid={row.uuid}
                      />
                    </Grid>
                  )
                }

                <Grid item>
                  {row.case_creator ? (
                    row.case_creator["ST1011_Permission"]["clinician"] &&
                    row?.case_assistant === null && (
                      <IconButton className={classes.tableButton} onClick={handleOpenTransferDialog}>
                        <Tooltip title="Трансфер кейса" aria-label="transfer">
                          <SyncIcon className={classes.icons} />
                        </Tooltip>
                      </IconButton>
                    )
                  ) : (
                    <div></div>
                  )}
                </Grid>
                {
                  // Objective: CASE Transfer
                  // Rule: CASE CREATOR exists
                  row.case_creator && (
                    <DialogTransfer
                      openTransferDialog={openTransferDialog}
                      setOpenTransferDialog={setOpenTransferDialog}
                      uuid={row["uuid"]}
                      CaseCreatorLN={row.case_creator["last_name"]}
                      CaseCreatorFN={row.case_creator["first_name"]}
                    />
                  )
                }
                <Grid item>
                  {
                    // Objective: CASE Edit
                    editingAction && (
                      <Tooltip title="Обновить" aria-label="edit">
                        <IconButton className={classes.tableButton} component={Link} to={`/ST1011/Case/${row.uuid}`}>
                          <FontAwesomeIcon className={classes.icons} icon={faEdit} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                </Grid>

                <Grid item>
                  {row.clinical_interpretation != null && row.case_consultants.length > 0 && (
                    <Tooltip title="Обзор кейса" aria-label="edit">
                      <IconButton
                        className={classes.tableButton}
                        component={Link}
                        to={`/ST1011/Case/Review/${row.uuid}`}
                      >
                        <ListAltIcon className={classes.icons} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>

                <Grid item>
                  <Tooltip title="Архивы" aria-label="edit">
                    <IconButton
                      className={classes.tableButton}
                      component={Link}
                      to={`/ST1011/Case/${row.personal_number}/Archive/`}
                    >
                      <FontAwesomeIcon className={classes.icons} icon={faMailBulk} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </React.Fragment>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCell} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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
