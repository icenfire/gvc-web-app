import React, { FC, Fragment, useState } from 'react'
import { AppBarMain } from 'src/components/Level1/AppBars/AppBarMain'
import { ContainerMain } from 'src/components/Level1/Containers/ContainerMain'
import { NoticeCreator } from '../Level2/NoticeCreator'

import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers/rootReducer'
import { EditNotice } from '../Level2/EditNotice'
import { useFirestoreConnect } from 'react-redux-firebase'
export interface IPNoticesPage {}

export interface ISNoticesPage {}

export const NoticesPage: FC<IPNoticesPage> = props => {
  useFirestoreConnect([
    { collection: 'notices', orderBy: ['createdAt', 'asc'] }
  ])

  const noticesArr = useSelector<AppState, any>(
    state => state.firestore.ordered.notices
  )

  return (
    <Fragment>
      <AppBarMain title="Notices" />
      <ContainerMain>
        <NoticeCreator />
        <EditNotice notices={noticesArr} />
      </ContainerMain>
    </Fragment>
  )
}
