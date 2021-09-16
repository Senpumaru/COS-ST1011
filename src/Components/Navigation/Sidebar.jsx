import { faElementor } from "@fortawesome/free-brands-svg-icons";
import { faCalculator, faDatabase, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <List>
      <Typography pr={2} align="right" variant="h4">
        Панель
      </Typography>
      <Divider />
      <ListItem component={Link} to="/menu" button>
        <ListItemIcon
          sx={{
            fontSize: 30,
            paddingLeft: "0.2rem",
            color: "success.main",
          }}
        >
          <FontAwesomeIcon icon={faElementor} />
        </ListItemIcon>
        <ListItemText primary="Главное меню" />
      </ListItem>
      <ListItem component={Link} to="/dashboard" button>
        <ListItemIcon
          sx={{
            fontSize: 30,
            paddingLeft: "0.2rem",
            color: "success.main",
          }}
        >
          <FontAwesomeIcon icon={faServer} />
        </ListItemIcon>
        <ListItemText primary="База кейсов" />
      </ListItem>
      <ListItem component={Link} to="/statistics" button>
        <ListItemIcon
          sx={{
            fontSize: 30,
            paddingLeft: "0.2rem",
            color: "success.main",
          }}
        >
          <FontAwesomeIcon icon={faCalculator} />
        </ListItemIcon>
        <ListItemText primary="Статистика" />
      </ListItem>
    </List>
  );
}

export default Sidebar;
