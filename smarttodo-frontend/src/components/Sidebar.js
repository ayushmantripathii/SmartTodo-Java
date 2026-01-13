import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon><ChecklistIcon /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><ScheduleIcon /></ListItemIcon>
          <ListItemText primary="Upcoming" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><DoneAllIcon /></ListItemIcon>
          <ListItemText primary="Completed" />
        </ListItem>
      </List>
    </Drawer>
  );
}
