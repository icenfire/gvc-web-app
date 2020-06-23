import List from "@material-ui/core/List"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, ReactNode } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {},
  })
)

export interface IPCustomList {
  items: React.ReactNode[]
  render: (item: React.ReactNode) => React.ReactNode
}

export const CustomList: FC<IPCustomList> = ({ items, render }) => {
  const classes = useStyles()

  return <List className={classes.list}>{items.map(render)}</List>
}
