import React, { Fragment } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }),
)

export interface Props {
  
}

export interface State {
  prayer: string
  retreat: boolean
  present: boolean
}

function Dates(props: Props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    prayer:
      "리더로서의 직분을 칙임감있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.",
    retreat: false,
    present: false
  })
  
  return (
    <Fragment>
      
    </Fragment>
  )
}

export default Dates