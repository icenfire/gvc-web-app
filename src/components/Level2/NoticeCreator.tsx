import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Textfield from "@material-ui/core/TextField"
import React, { Fragment } from "react"
import { connect } from "react-redux"

import { createNotice } from "./../../store/actions/noticeActions"
import { IPNotice } from "./../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface NoticeUpload {
  title: string
  content: string
}

function NoticeCreator(props: any) {
  const classes = useStyles()
  const [values, setValues] = React.useState<NoticeUpload>({
    title: "",
    content: ""
  })

  const onChange = (name: keyof IPNotice) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setValues({ ...values, [name]: event.target.value })

  const onSubmit = () => {
    props.createNotice(values)
  }

  return (
    <Fragment>
      <Textfield
        label="Title"
        onChange={onChange("title")}
        value={values.title}
      />
      <Textfield
        label="Content"
        onChange={onChange("content")}
        value={values.content}
      />
      <Button onClick={onSubmit}>Create new notice</Button>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNotice: (notice: any) => dispatch(createNotice(notice))
  }
}

export default connect(null, mapDispatchToProps)(NoticeCreator)
