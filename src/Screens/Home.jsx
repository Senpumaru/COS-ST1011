import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Home() {
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
        <Typography variant="h2">Главное меню</Typography>
      </Box>
        <a href="http://cos.omr/api/account/Menu/">Список приложений</a>
    </React.Fragment>
  );
}

export default Home;
