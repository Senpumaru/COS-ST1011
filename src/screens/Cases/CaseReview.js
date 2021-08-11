import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approvalUpdateAction,
  caseDetailsAction,
} from "../../actions/Cases/CaseActions";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "../../components/Loader";

const useStyles = makeStyles({
  screenTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: "#F2AA4CFF",
    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  cardWarning: {
    fontSize: 18,
    fontWeight: 600,

    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  formControl: {
    margin: 0,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: 2,
  },
  dialogTitle: {
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogWarning: {
    fontSize: "1.0rem",
    color: "#424242",
  },
});


const SERVER_URL = process.env.REACT_APP_API_SERVER;

function CaseReview({ history, match }) {
  const classes = useStyles();
  const caseUUID = match.params.id;

  /*** Redux States ***/
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ST1011["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  const approvalUpdate = useSelector((state) => state.ST1011["approvalUpdate"]);
  const { loadingApproval, successApproval, errorApproval } = approvalUpdate;

  /** DETAILS **/
  useEffect(() => {
    dispatch(caseDetailsAction(match.params.id));
  }, [successApproval]);

  /** Approval **/
  var checkApprovalConsulant = instance?.case_approvals?.filter((obj) => {
    return obj.consultant === userInfo.id;
  });

  const [openApprovalAlert, setOpenApprovalAlert] = useState(false);

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

  /** Review **/
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const [reviewSuccess, setReviewSuccess] = useState(false);

  function ReviewChoice() {
    if (
      instance["case_editor"] && instance["version_state"] == "In-progress" && instance["case_editor"]["id"] === userInfo.id &&
      instance?.case_approvals?.length > 0
    ) {
      const allApprovals = instance.case_approvals;
      if (
        allApprovals
          ?.map((a) => a.approval)
          .every(function (e) {
            return e === true;
          }) === true
      ) {
        if (reviewSuccess == true) {
          return <Typography>Отчет оформлен</Typography>;
        } else {
          return (
            <Button
              onClick={handleOpenReviewDialog}
              color="secondary"
              variant="contained"
            >
              Создать Отчет
            </Button>
          );
        }
      } else {
        return (
          <Typography className={classes.cardWarning}>
            {
              "Отчет не может быть создан, пока все консультанты не одобрили кейс."
            }
          </Typography>
        );
      }
    } else {
      return <div></div>;
    }
  }

  /* Review Process */
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const handleOpenReviewDialog = () => {
    console.log("Test");
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  async function handleReview() {
    setReviewLoading(true);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    try {
      await axios
        .put(SERVER_URL + `api/ST1011/cases/${instance.uuid}/review/`, instance, config)
        .then(function (response) {
          setReviewSuccess(true);
          dispatch(caseDetailsAction(match.params.id));
          setOpenReviewDialog(false);
        });
    } catch (error) {
      setReviewError(
        error.response && error.response.data.Detail
          ? error.response.data.Detail
          : error.message
      );
      setOpenReviewDialog(false);
    }
  }

  return (
    <React.Fragment>
      <Box p={1} pt={2}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item md={12} sm={12} xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.screenTitle}>
                Обзор кейса: {instance.case_code}
              </Typography>
            </Grid>
            {loadingDetails ? (
              <Loader>Загрузка...</Loader>
            ) : (
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography className={classes.cardTitle}>
                        Версия кейса: {instance.version}
                      </Typography>
                    </Grid>
                    <Grid container item spacing={1}>
                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Дата получения: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.date_of_acquisition}
                        </Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Организация: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.institution}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Диагноз: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.diagnosis}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Показатель экспрессии PD-L1 опухолевыми клетками: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.cancer_cell_percentage + "%"} 
                        </Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Показатель экспрессии PD-L1 иммунными клетками: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.immune_cell_percentage + "%"}
                        </Typography>
                      </Grid>

                      

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Клиническая интерпретация: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.clinical_interpretation}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <ReviewChoice />
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.screenTitle}>
                Консультанты
              </Typography>
            </Grid>
            {loadingDetails || loadingApproval ? (
              <Loader>Загрузка...</Loader>
            ) : (
              <Card>
                <CardContent>
                  <Grid container>
                    {instance?.case_consultants?.length > 0 &&
                      instance.case_consultants?.map((item, index) => {
                        const approval = instance?.case_approvals?.find(
                          (x) => x.consultant === item["id"]
                        )["approval"];
                        return (
                          <Grid item md={4} sm={6} xs={12} key={index}>
                            <Typography className={classes.cardTitle}>
                              {item["last_name"] + " " + item["first_name"]}
                            </Typography>
                            Решение:{" "}
                            <div>
                              {(() => {
                                switch (approval) {
                                  case true:
                                    return <Typography>Утвержден</Typography>;
                                  case false:
                                    return <Typography>Не утвержден</Typography>;
                                  default:
                                    return <Typography>Нет ответа</Typography>;
                                }
                              })()}
                            </div>
                            {userInfo["id"] == item["id"] &&
                              userInfo["credentials"]["consultant"] ===
                                true && (
                                <Button
                                  onClick={() => handleOpenApproveAlert()}
                                  color="secondary"
                                  variant="contained"
                                >
                                  Ответ
                                </Button>
                              )}
                          </Grid>
                        );
                      })}
                    <React.Fragment>
                      <Dialog
                        open={openReviewDialog}
                        onClose={handleCloseReviewDialog}
                        aria-labelledby="review-dialog-title"
                        aria-describedby="review-dialog-description"
                      >
                        <DialogTitle
                          className={classes.dialogTitle}
                          id="review-dialog-title"
                        >
                          Создание отчета
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText
                            className={classes.dialogWarning}
                            id="Dialog-description-id"
                          >
                            <strong>Внимание!</strong>
                            <br />
                            Кейс будет переведен в отчет. Любые дальнейшие
                            изменения кейса приведут к потере нынешнего отчета.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseReviewDialog}
                            variant="outlined"
                            color="primary"
                          >
                            Отмена
                          </Button>
                          <Button
                            onClick={handleReview}
                            variant="outlined"
                            color="primary"
                            autoFocus
                          >
                            Принять
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
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
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item>{"Утверждение кейса"}</Grid>
                            <Grid item>
                              <IconButton
                                aria-label="close"
                                className={classes.icons}
                                onClick={handleCloseApproveAlert}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </DialogTitle>

                        <DialogContent>
                          <DialogContentText
                            className={classes.dialogWarning}
                            id="Dialog-description-id"
                          >
                            <strong>Внимание!</strong>
                            <br />
                            Любое изменение в заключении данного кейса со
                            стороны патолога приведет к обнулению вашего
                            решения. Можете поменять решение в любое время до
                            публикации данной версии кейса. При утверждении
                            кейса всеми консультантами, кейс будет доступен для
                            публикации.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
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
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default CaseReview;
