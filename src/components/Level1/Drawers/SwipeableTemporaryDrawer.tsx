import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import PeopleIcon from "@material-ui/icons/People"
import React, { FC, Fragment } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { signOut } from "../../../store/actions/authActions"
import { Paths } from "../../../types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 250,
      // width: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    list: {
      flex: 1,
    },
  })
)

interface Props {
  drawerOpen: boolean
  toggleDrawer: (open: boolean) => (event: React.MouseEvent) => void
}

type Items = {
  name: string
  icon: (props: SvgIconProps) => JSX.Element
  page: Paths
  dividerBelow?: boolean
}[]

export const SwipeableTemporaryDrawer: FC<Props> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const items: Items = [
    {
      name: "My Account",
      icon: AccountCircleIcon,
      page: "/myaccount",
      dividerBelow: true,
    },
    {
      name: "Members",
      icon: PeopleIcon,
      page: "/members",
    },
    {
      name: "Prayers",
      icon: LibraryBooksIcon,
      page: "/prayers",
    },
    {
      name: "Calendar",
      icon: CalendarTodayIcon,
      page: "/calendar",
    },
  ]

  return (
    <SwipeableDrawer
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={classes.drawer}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List className={classes.list}>
          {items.map(item => (
            <Fragment key={item.name}>
              <ListItem button onClick={() => history.push(item.page)}>
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
              {item.dividerBelow && <Divider />}
            </Fragment>
          ))}
        </List>
        <List>
          <ListItem
            button
            onClick={() => {
              dispatch(signOut())
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  )
}
