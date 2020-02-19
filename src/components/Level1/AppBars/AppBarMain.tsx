import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"
import React, { Fragment } from "react"

import { SwipeableTemporaryDrawer } from "./../Drawers/SwipeableTemporaryDrawer"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
    title: {
      flexGrow: 1,
      paddingLeft: theme.spacing(1.5),
    },
  })
)

export const AppBarMain: React.FC = () => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    drawerOpen: false,
  })

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setState({ drawerOpen: open })
  }

  return (
    <Fragment>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar disableGutters={!state.drawerOpen}>
          <IconButton aria-label="Open drawer" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} noWrap>
            강민정셀
          </Typography>
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="More">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableTemporaryDrawer
        drawerOpen={state.drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </Fragment>
  )
}
