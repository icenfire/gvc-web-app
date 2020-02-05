import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // display: "flex",
      // overflow: "auto",
      // flexDirection: "column",
      height: 200
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1)
    },
    input: {
      color: theme.palette.secondary.main
    },
    grid: {
      padding: theme.spacing(2)
    }
  })
)

export interface IPPrayerPaper {}

export interface ISPrayerPaper {}

function PrayerPaper(props: IPPrayerPaper) {
  const classes = useStyles()
  const [values, setValues] = React.useState<ISPrayerPaper>({})

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item>
          <IconButton className={classes.IconButtonEditMember}>
            <PersonIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="secondary" variant="h5">
                <b>강민정</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary">01/01/2020</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                // id="standard-multiline-flexible"
                // label="Multiline"
                multiline
                rowsMax="4"
                defaultValue="리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.리더로의 직분을 책임있있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록."
                inputProps={{ className: classes.input }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { PrayerPaper }
