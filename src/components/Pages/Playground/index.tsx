import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

import { ProfileEditDialog } from "../../Level1/Dialogs/ProfileEditDialog"
import { PrayerPaper } from "../../Level1/Papers/PrayerPaper"
import { Notices as NoticesGridList } from "../../Level2/GridLists/Notices"
import { DatesList, IPDatesList } from "../../Level2/Lists/DatesList"
import { IPMembersEditList, MembersEditList } from "../../Level2/Lists/MembersEditList"
import { MembersEditListWithGrid } from "../../Level2/Lists/MembersEditListWithGrid"
import { NoticeCreator } from "../../Level2/NoticeCreator"
import { Notices as NoticesSwipeable } from "../../Level2/SwipeableListViews/Notices"
import { GetNameInitialLetter } from "./GetNameInitialLetter"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderColor: theme.palette.common.white,
      borderWidth: 2,
      borderStyle: "solid",
      marginBottom: 50,
      padding: theme.spacing(1),
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
  })
)

export const Playground: React.FC = () => {
  const classes = useStyles()

  useFirestoreConnect("notices")
  const notices = useSelector(
    (state: { firestore: any }) => state.firestore.ordered.notices
  )

  const dates: IPDatesList["dates"] = [
    ["January 2020", ["01.01.20", "02.01.20"]],
    ["February 2020", ["01.02.20", "02.02.20"]],
    ["March 2020", ["01.03.20", "02.03.20"]],
    ["April 2020", ["01.04.20", "02.04.20"]],
  ]

  const members: IPMembersEditList["members"] = [
    { name: "강민정", dob: "10.09.1990" },
    { name: "권주은", dob: "25.12.1995" },
    { name: "송인영", dob: "10.09.1990" },
    { name: "임소민", dob: "25.12.1995" },
  ]

  return (
    <Fragment>
      <Typography>Notices in scrollable Grid List</Typography>
      <Container className={classes.container}>
        <NoticesGridList notices={notices} />
      </Container>

      <Typography>Notices in Swipeable List View</Typography>
      <Container className={classes.container}>
        <NoticesSwipeable notices={notices} />
      </Container>

      <Typography>Notice creator</Typography>
      <Container className={classes.container}>
        <NoticeCreator />
      </Container>

      <Typography>Dates</Typography>
      <Container className={classes.container}>
        <DatesList dates={dates} />
      </Container>

      <Typography>Members Edit Page</Typography>
      <Container className={classes.container}>
        <MembersEditList members={members} />
      </Container>
      <Typography>Members Edit Page With Grid</Typography>
      <Container className={classes.container}>
        <MembersEditListWithGrid members={members} />
      </Container>

      <Typography>Korean to Korean initial</Typography>
      <Container className={classes.container}>
        <GetNameInitialLetter />
      </Container>

      <Typography>Prayer Paper</Typography>
      <Container className={classes.container}>
        <PrayerPaper />
      </Container>

      <Typography>Profile Edit Dialog</Typography>
      <Container className={classes.container}>
        <ProfileEditDialog>
          <IconButton className={classes.IconButtonEditMember}>
            <PersonIcon />
          </IconButton>
        </ProfileEditDialog>
      </Container>
    </Fragment>
  )
}
