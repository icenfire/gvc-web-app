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
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import PeopleIcon from "@material-ui/icons/People"
import React, { FC, Fragment } from "react"
import { useHistory } from "react-router-dom"

import { Paths } from "../../../types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
      // width: "auto",
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

  const items: Items = [
    {
      name: "My Account",
      icon: AccountCircleIcon,
      page: "/myaccount",
      dividerBelow: true,
    },
    {
      name: "Members' Profiles",
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

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
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
    </div>
  )

  return (
    <SwipeableDrawer
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {sideList()}
    </SwipeableDrawer>
  )
}
