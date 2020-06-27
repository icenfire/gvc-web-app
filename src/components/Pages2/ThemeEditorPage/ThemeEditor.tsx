import { createMuiTheme } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { createStyles, makeStyles, Theme, ThemeOptions } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import ReactJsonEditor from "jsoneditor-for-react"
import React, { FC, Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTheme, setCurrentThemeName, uploadTheme } from "src/store/actions/themeActions"
import { Themes } from "src/types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    editor: { maxHeight: "80vh", overflow: "auto" },
  })
)

export interface IPThemeEditor {
  currentThemeName: string
  themes: Themes
}

export const ThemeEditor: FC<IPThemeEditor> = ({
  currentThemeName,
  themes,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentThemeNameState, setCurrentThemeNameState] = useState<string>(
    currentThemeName
  )
  const [createNewTheme, setCreateNewTheme] = useState<boolean>(false)
  const [newThemeName, setNewThemeName] = useState<string>(currentThemeName)

  const [currentThemeValues, setCurrentThemeValues] = useState<ThemeOptions>(
    createMuiTheme(
      currentThemeName === "Default"
        ? {}
        : JSON.parse(themes[currentThemeName]["string"])
    )
  )

  const getCurrentTheme = (name: string) => {
    let theme =
      createNewTheme || name === "Default"
        ? {}
        : JSON.parse(themes[name]["string"])
    return createMuiTheme(theme)
  }

  const handleCurrentThemeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    let chosenTheme = event.target.value
    if (chosenTheme === "New...") {
      setCreateNewTheme(true)
      setNewThemeName("")
    } else {
      setCreateNewTheme(false)
      setNewThemeName(chosenTheme as string)
      dispatch(setCurrentThemeName(chosenTheme as string))
    }
    setCurrentThemeNameState(chosenTheme as string)
  }

  const getMenus = () => {
    let menus = ["New...", "Default"]
    if (themes) {
      return [...menus, ...Object.keys(themes)]
    } else {
      return menus
    }
  }

  return (
    <Fragment>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={currentThemeNameState}
              onChange={handleCurrentThemeChange}
            >
              {getMenus().map((name) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item></Grid>
        <TextField
          value={newThemeName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewThemeName(event.target.value)
          }}
          label="Save as..."
        />

        <Grid item>
          {newThemeName !== "Default" && newThemeName !== "" && (
            <Button
              onClick={() => {
                dispatch(uploadTheme(newThemeName, currentThemeValues))
                dispatch(setCurrentThemeName(newThemeName as string))
                setCurrentThemeNameState(newThemeName as string)
              }}
              disabled={newThemeName === "Default" || newThemeName === ""}
              variant="contained"
              color="primary"
            >
              {"SAVE & Apply"}
            </Button>
          )}
        </Grid>

        <Grid item>
          {currentThemeNameState !== "Default" && (
            <Button
              onClick={() => {
                dispatch(setCurrentThemeName("Default"))
                setNewThemeName("Default")
                setCurrentThemeNameState("Default")
                dispatch(deleteTheme(newThemeName))
              }}
              disabled={currentThemeNameState === "Default"}
              variant="contained"
              color="secondary"
            >
              DELETE
            </Button>
          )}
        </Grid>
      </Grid>

      <div className={classes.editor}>
        <ReactJsonEditor
          values={getCurrentTheme(currentThemeNameState)}
          onChange={(values) => setCurrentThemeValues(values as ThemeOptions)}
        />
      </div>
    </Fragment>
  )
}
