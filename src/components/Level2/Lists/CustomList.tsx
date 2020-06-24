import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListSubheader from "@material-ui/core/ListSubheader"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC, ReactNode } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: { width: "100%", overflow: "auto" },
    ul: { padding: 0 },
    subheader: { background: theme.palette.background.default },
  })
)

type itemType = any | { subheader: string; subitems: any[] }

export interface IPCustomList {
  items: itemType[]
  render: (item: any) => ReactNode
}

export const CustomList: FC<IPCustomList> = ({ items, render }) => {
  const classes = useStyles()

  return (
    <List className={classes.list} subheader={<li />}>
      {items ? (
        items.map((item) => {
          return "subheader" in item ? (
            <li key={item.subheader}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}>
                  <Typography align="center">{item.subheader}</Typography>
                </ListSubheader>
                {item.subitems.map(render)}
              </ul>
            </li>
          ) : (
            render(item)
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </List>
  )
}
