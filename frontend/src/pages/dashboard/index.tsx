import * as React from "react";

import * as s from "./styles";
import { Divider, IconButton, List, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import ItemListDashboard from "./components/itemListDashboard";
import { MainContent } from "./components/mainContent";
import {
  getProjectCount,
  getProjectsWithTasks,
} from "../../actions/project.action";
import { useNavigate } from "react-router-dom";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const callServices = async () => {
    try {
      await getProjectsWithTasks();
      await getProjectCount();
    } catch (error) {
      const err = error as Error;
      switch (err.name) {
        case "UnauthorizedException":
          console.log("UnauthorizedException");
          navigate("/");
          break;
        default:
          console.error(error);
      }
    }
  };

  React.useEffect(() => {
    callServices();
  }, []);

  return (
    <s.DashboardBox>
      <s.AppBar position="absolute" open={open}>
        <s.Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Project Manager
          </Typography>
        </s.Toolbar>
      </s.AppBar>
      <s.Drawer variant="permanent" open={open}>
        <s.Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </s.Toolbar>
        <Divider />
        <List component="nav">
          <ItemListDashboard />
        </List>
      </s.Drawer>
      <s.MainBox>
        <MainContent />
      </s.MainBox>
    </s.DashboardBox>
  );
}
