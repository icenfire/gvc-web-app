import * as React from "react";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DraftsIcon from "@material-ui/icons/Drafts";
import InboxIcon from "@material-ui/icons/Inbox";

interface IPersistentDrawerProps {
  handleDrawerClose: () => void;
  open: boolean;
}

export default class PersistentDrawer extends React.Component<
  IPersistentDrawerProps
> {
  public render() {
    const { open, handleDrawerClose } = this.props;

    return (
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
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
  }
}
