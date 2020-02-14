import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Textfield from "@material-ui/core/TextField"
import React, { Fragment } from "react"
import { useDispatch } from "react-redux"

import { createNotice } from "./../../store/actions/noticeActions"
import { Props as IPNotice } from "./../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface State {
  title: string
  content: string
}

export const NoticeCreator: React.FC = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    title: "",
    content: "",
  })

  const onChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch(createNotice(values))
  }

  return (
    <Fragment>
      <Textfield
        label="Title"
        fullWidth
        onChange={onChange("title")}
        value={values.title}
      />
      <Textfield
        id="standard-multiline-flexible"
        fullWidth
        multiline
        rowsMax="4"
        label="Content"
        onChange={onChange("content")}
        value={values.content}
      />
      <Button onClick={onSubmit}>Create new notice</Button>
    </Fragment>
  )
}
