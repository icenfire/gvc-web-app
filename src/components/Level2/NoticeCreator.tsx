import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Textfield from "@material-ui/core/TextField"
import React, { Fragment } from "react"
import { useDispatch } from "react-redux"

import { createNotice } from "./../../store/actions/noticeActions"
import { IPNotice } from "./../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface NoticeUpload {
  title: string
  content: string
}

export const NoticeCreator: React.FC = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState<NoticeUpload>({
    title: "",
    content: "",
  })

  const onChange = (name: keyof IPNotice) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value)
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
