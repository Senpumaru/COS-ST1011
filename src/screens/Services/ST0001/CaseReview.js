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
} from "../../../actions/Services/ST0001/CaseActions";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "../../../components/Loader";

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
    fontSize: "1.4rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogWarning: {
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function CaseReview({ history, match }) {
  const classes = useStyles();
  const caseUUID = match.params.id;

  /*** Redux States ***/
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.User["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ALK["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  const approvalUpdate = useSelector((state) => state.ALK["approvalUpdate"]);
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
  console.log(reviewError);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  function ReviewChoice() {
    if (
      userInfo["credentials_status"]["Pathologist"] === true &&
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
              onClick={handleReview}
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
      return <div>not validated</div>;
    }
  }

  async function handleReview() {
    setReviewLoading(true);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios
        .put(`https://acs-test-app.herokuapp.com/api/ST0001/cases/${instance.uuid}/review/`, instance, config)
        .then(function (response) {
          setReviewSuccess(true);
          dispatch(caseDetailsAction(match.params.id));
        });
    } catch (error) {
      setReviewError(
        error.response && error.response.data.Detail
          ? error.response.data.Detail
          : error.message
      );
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
                      <Grid item md={4} xs={12}>
                        <Typography>Дата регистрации: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.date_of_registration}
                        </Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Организация: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography> {instance.institution}</Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Диагноз: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography> {instance.diagnosis}</Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Микроскопическое описание: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.microscopic_description}
                        </Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Гистологическое описание: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography>
                          {" "}
                          {instance.histological_description}
                        </Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Паттерн окраски: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Typography> {instance.staining_pattern}</Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography>Клиническая интерпретация: </Typography>
                      </Grid>
                      <Grid item md={8} xs={12}>
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
                            <Typography>
                              {(() => {
                                switch (approval) {
                                  case true:
                                    return <div>Утвержден</div>;
                                  case false:
                                    return <div>Не утвержден</div>;
                                  default:
                                    return <div>Нет ответа</div>;
                                }
                              })()}
                            </Typography>
                            {userInfo["id"] == item["id"] &&
                              userInfo["credentials_status"]["Consultant"] ===
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
