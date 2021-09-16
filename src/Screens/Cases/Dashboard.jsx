import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FormDialog from "../../Components/Dialogs/FormDialog";
import CaseForm from "../../Components/Forms/CaseForm";
import Database from "./Data/Database";

function Dashboard() {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          pl: 1,
          borderLeft: "0.2rem solid #f9a825",
          borderBottom: "0.2rem solid #f9a825",
          width: "20rem",
          flexGrow: 1,
        }}
      >
        <Typography variant="h2">База кейсов</Typography>
      </Box>
      <Box pt={2}>
        <Button variant="outlined" onClick={handleDialogOpen}>
          Кейс
        </Button>
        <FormDialog isDialogOpened={open} handleCloseDialog={() => setOpen(false)} content={<CaseForm />} />

        <Database />
      </Box>
    </React.Fragment>
  );
}

export default Dashboard;
