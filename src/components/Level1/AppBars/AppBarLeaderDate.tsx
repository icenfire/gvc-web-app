import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DraftsIcon from "@material-ui/icons/Drafts";
import InboxIcon from "@material-ui/icons/Inbox";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

interface IAppBarLeaderDateState {
  open: boolean;
}

export default class AppBarLeaderDate extends React.Component<
  any,
  IAppBarLeaderDateState
> {
  public state = {
    open: false
  };

  public render() {
    const { open } = this.state;

    const drawer = (
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          <ListItem button={true}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>{" "}
      </Drawer>
    );

    return (
      <div>
        <div>
          <AppBar>
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              {/* <Typography variant="h6" color="inherit" noWrap={true}> */}
              <Typography color="inherit" noWrap={true}>
                강민정셀
              </Typography>
              <IconButton color="inherit" aria-label="Search">
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="More">
                <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {drawer}
        </div>
      </div>
    );
  }

  private handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  private handleDrawerClose = () => {
    this.setState({ open: false });
  };
}
