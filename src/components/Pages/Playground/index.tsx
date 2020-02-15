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
import { MembersEditList } from "../../Level2/Lists/MembersEditList"
import { MembersList, Props as IPMembersList } from "../../Level2/Lists/MembersList"
import { NoticeCreator } from "../../Level2/NoticeCreator"
import { Notices as NoticesSwipeable } from "../../Level2/SwipeableListViews/Notices"
import { SwipeableTemporaryDrawer } from "./../../Level1/Drawers/SwipeableTemporaryDrawer"
import { GetNameInitialLetter } from "./GetNameInitialLetter"
import { MembersFilter } from "./MembersFilter"

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

  // Get notices from Firestore
  useFirestoreConnect("notices")
  const notices = useSelector(
    (state: { firestore: any }) => state.firestore.ordered.notices
  )

  // Get members from Firestore
  useFirestoreConnect("members")
  const members = useSelector(
    (state: { firestore: any }) => state.firestore.ordered.members
  )
  // members2 && console.log(members2)

  const dates: IPDatesList["dates"] = [
    ["January 2020", ["01.01.20", "02.01.20"]],
    ["February 2020", ["01.02.20", "02.02.20"]],
    ["March 2020", ["01.03.20", "02.03.20"]],
    ["April 2020", ["01.04.20", "02.04.20"]],
  ]

  // const members: IPMembersEditList["members"] = [
  //   { name: "강민정", dob: new Date("1990/09/10") },
  //   { name: "권주은", dob: new Date("1995/12/25") },
  //   { name: "송인영", dob: new Date("1990/09/10") },
  //   { name: "임소민", dob: new Date("1995/12/25") },
  // ]

  return (
    <Fragment>
      <Typography>Swipeable Drawer</Typography>
      <Container className={classes.container}>
        <SwipeableTemporaryDrawer />
      </Container>

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
      {/* <Container className={classes.container}>
        <MembersEditList members={members} />
      </Container> */}
      <Typography>Members Edit Page With Grid</Typography>
      <Container className={classes.container}>
        {/* <MembersList members={members} /> */}
        <MembersFilter members={members} />
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
