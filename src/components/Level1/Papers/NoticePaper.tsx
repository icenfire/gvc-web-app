import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { FC, Fragment, useState } from 'react'
import { AppState } from '../../../store/reducers/rootReducer'
import { INoticeWithMeta } from '../../../types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { firestore } from 'firebase'
import {
  deleteNotice,
  updateNotice
} from '../../../store/actions/noticeActions'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.common.white,
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: '100%'
    },
    closeButton: {
      color: 'black'
    }
  })
)

export const NoticePaper: FC<INoticeWithMeta> = notice => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    editAbleTitle: false,
    editAbleContent: false,
    title: notice.title,
    content: notice.content
  })

  const { editAbleTitle, editAbleContent, title, content } = formData

  const isAuthenticated = useSelector<AppState, boolean>(
    state => !state.firebase.auth.isEmpty
  )

  const dispatch = useDispatch()

  const onClickDeleteButton = (id: string) => () => {
    dispatch(deleteNotice(id))
  }

  const handleBlur = (name: string) => (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (title !== notice.title) {
    }
  }

  return (
    <Paper className={classes.paper}>
      {isAuthenticated && (
        <IconButton aria-label="delete" className={classes.closeButton}>
          <DeleteIcon onClick={onClickDeleteButton(notice.id)} />
        </IconButton>
      )}

      {editAbleTitle ? (
        <input
          type="text"
          onChange={event =>
            setFormData({ ...formData, title: event.target.value })
          }
          value={title}
          onBlur={() => {
            dispatch(
              updateNotice({
                ...notice,
                title: title
              })
            )
            setFormData({ ...formData, editAbleTitle: false })
          }}
        />
      ) : (
        <div
          style={{ color: 'black' }}
          onClick={() =>
            setFormData({ ...formData, editAbleTitle: !editAbleTitle })
          }
        >
          {title}
        </div>
      )}

      {editAbleContent ? (
        <input
          type="text"
          onChange={event =>
            setFormData({ ...formData, content: event.target.value })
          }
          value={content}
          onBlur={() => {
            dispatch(
              updateNotice({
                ...notice,
                content: content
              })
            )
            setFormData({ ...formData, editAbleContent: false })
          }}
        />
      ) : (
        <div
          style={{ color: 'black' }}
          onClick={() =>
            setFormData({ ...formData, editAbleContent: !editAbleContent })
          }
        >
          {content}
        </div>
      )}

      {/* {notice.content.split('\n').map((text, key) => {
        return (
          <Typography key={key} color="secondary" variant="body2">
            {text}
          </Typography>
        )
      })} */}
      <Typography color="secondary">
        {notice.createdAt.toDate().toDateString()}
      </Typography>
    </Paper>
  )
}
