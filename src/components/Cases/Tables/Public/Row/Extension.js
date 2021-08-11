import { Container, Grid, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useRowStyles = makeStyles({
  expansionTitle: {
    fontWeight: 600,
    fontSize: "0.8rem",
    backgroundColor: "#F2AA4CFF",
    padding: "0.1rem",
  },
  expansionSubTitle: {
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  expansionSubText: {
    fontSize: "0.8rem",
  },
});

function Extension(props) {
  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Row components ***/
  /* Row Expansion */
  const { row } = props;

  return (
    <Container maxWidth="xl">
      <Typography className={classes.expansionTitle} gutterBottom component="div">
        Номер кейса: {row.personal_number}
      </Typography>

      <Grid container spacing={1}>
        <Grid container item md={8} xs={8}>
          <Grid item md={12} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography noWrap className={classes.expansionSubTitle}>
                Направивший врач:
              </Typography>
              <Typography noWrap className={classes.expansionSubText} style={{ marginLeft: 10 }}>
                {row.case_sender}
              </Typography>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography noWrap className={classes.expansionSubTitle}>
                Организация:
              </Typography>
              <Typography noWrap className={classes.expansionSubText} style={{ marginLeft: 10 }}>
                {row.institution}
              </Typography>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography className={classes.expansionSubTitle}>Диагноз:</Typography>
              <Typography className={classes.expansionSubText} style={{ marginLeft: 10 }}>
                {row.diagnosis}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container item md={4} xs={4}>
          <Grid item md={12} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography className={classes.expansionSubTitle} noWrap>
                Блоки:
              </Typography>
              <Typography className={classes.expansionSubText} style={{ marginLeft: 10 }} noWrap>
                {row?.block_codes?.toString()}
              </Typography>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography className={classes.expansionSubTitle} noWrap>
                МП:
              </Typography>
              <Typography className={classes.expansionSubText} style={{ marginLeft: 10 }} noWrap>
                {row?.slide_codes?.toString()}
              </Typography>
            </div>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography className={classes.expansionSubTitle} noWrap>
                Кол. БЛ:
              </Typography>
              <Typography className={classes.expansionSubText} style={{ marginLeft: 10 }} noWrap>
                {row.block_count}
              </Typography>
            </div>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography className={classes.expansionSubTitle} noWrap>
                Кол. МП:
              </Typography>
              <Typography className={classes.expansionSubText} style={{ marginLeft: 10 }} noWrap>
                {row.slide_count}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={4} xs={12}>
          Создатель:{" "}
          {row.case_creator && row.case_creator["last_name"] + " " + row.case_creator["first_name"]}
        </Grid>

        {row?.case_assistant ? (
          <Grid item md={4} xs={12}>
            Оформил кейс: {row.case_assistant["last_name"] + " " + row.case_assistant["first_name"]}
          </Grid>
        ) : null}

        <Grid item md={4} xs={12}>
          Назначенный патолог:{" "}
          {row.case_editor && row.case_editor["last_name"] + " " + row.case_editor["first_name"]}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Extension;
