import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { FC, Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ExtendedFirestoreInstance,
  useFirestoreConnect
} from 'react-redux-firebase'
import { AppBarMain } from 'src/components/Level1/AppBars/AppBarMain'
import { ContainerMain } from 'src/components/Level1/Containers/ContainerMain'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Notices as NoticesSwipeable } from '../Level2/SwipeableListViews/Notices'
import { AppState } from '../../store/reducers/rootReducer'
import { NoticeCreator } from '../Level2/NoticeCreator'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderColor: theme.palette.common.white,
      borderWidth: 2,
      borderStyle: 'solid',
      marginBottom: 50,
      padding: theme.spacing(1)
    }
  })
)

export interface IPNoticesPage {}

export interface ISNoticesPage {}

export const NoticesPage: FC<IPNoticesPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISNoticesPage>({})

  useFirestoreConnect([
    { collection: 'notices', orderBy: ['createdAt', 'asc'] }
  ])

  const stateFS = useSelector<AppState, any>(state => state.firestore)
  const noticesArr = stateFS.ordered.notices

  return (
    <Fragment>
      <AppBarMain title="Notices" />
      <ContainerMain>
        <Typography>Notice creator</Typography>
        <Container className={classes.container}>
          <NoticeCreator />
        </Container>

        <Typography>Notices in Swipeable List View</Typography>
        <Container className={classes.container}>
          <NoticesSwipeable notices={noticesArr} />
        </Container>
      </ContainerMain>
    </Fragment>
  )
}
