import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Textfield from "@material-ui/core/TextField"
import React, { Fragment } from "react"
import { useDispatch } from "react-redux"

import { createNotice } from "./../../store/actions/noticeActions"
import { INotice } from "./../../types"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export const NoticeCreator: React.FC = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState<INotice>({
    title: "",
    content: "",
  })

  const onChange = (name: keyof INotice) => (
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
