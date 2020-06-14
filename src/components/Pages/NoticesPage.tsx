import React, { FC, Fragment, useState } from 'react'
import { AppBarMain } from 'src/components/Level1/AppBars/AppBarMain'
import { ContainerMain } from 'src/components/Level1/Containers/ContainerMain'

export interface IPNoticesPage {}

export interface ISNoticesPage {}

export const NoticesPage: FC<IPNoticesPage> = props => {
  return (
    <Fragment>
      <AppBarMain title="Notices" />
      <ContainerMain>Notices Page</ContainerMain>
    </Fragment>
  )
}
