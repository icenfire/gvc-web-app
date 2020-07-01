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
  const [createNewThemeMode, setCreateNewThemeMode] = useState<boolean>(false)
  const [newThemeName, setNewThemeName] = useState<string>(currentThemeName)

  const [currentThemeValues, setCurrentThemeValues] = useState<{
    input: string
    output: string
  }>(themes[currentThemeName])

  const [inputJSON, setInputJSON] = useState<string>("{}")
  const [JSONErrorMessage, setJSONErrorMessage] = useState<string>("")

  const prettifyJSONString = (s: string) => {
    try {
      const json = JSON.parse(s)
      setJSONErrorMessage("")
      return JSON.stringify(json, null, 2)
    } catch (e) {
      setJSONErrorMessage(e.message)
      return s
    }
  }

  console.log({ currentThemeValues })

  const getCurrentTheme = (name: string) =>
    createNewThemeMode ? { input: "{}", output: "{}" } : themes[name]

  const handleCurrentThemeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInputJSON("{}")
    setJSONErrorMessage("")

    let chosenTheme = event.target.value
    if (chosenTheme === "New...") {
      setCreateNewThemeMode(true)
      setNewThemeName("")
    } else {
      setCreateNewThemeMode(false)
      setNewThemeName(chosenTheme as string)
      dispatch(setCurrentThemeName(chosenTheme as string))
      setCurrentThemeValues(getCurrentTheme(chosenTheme as string))
    }
    setCurrentThemeNameState(chosenTheme as string)
  }

  const getMenus = () => {
    let menus = ["New...", "Default"]
    if (themes) {
      return [
        ...menus,
        ...Object.keys(themes).filter((theme) => theme !== "Default"),
      ]
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
          error={newThemeName === ""}
          helperText={newThemeName === "" ? "Please write a name to save" : ""}
        />
        <Grid item xs={12}>
          <TextField
            value={createNewThemeMode ? inputJSON : currentThemeValues.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              prettifyJSONString(event.target.value)
              setInputJSON(event.target.value)
            }}
            label="Input JSON"
            multiline
            rows={4}
            rowsMax={10}
            fullWidth
            error={JSONErrorMessage !== ""}
            helperText={JSONErrorMessage}
            disabled={!createNewThemeMode}
          />
        </Grid>
        {createNewThemeMode && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setInputJSON(prettifyJSONString(inputJSON))
              }}
              disabled={JSONErrorMessage !== "" || !createNewThemeMode}
            >
              Auto Format JSON
            </Button>
          </Grid>
        )}

        <Grid item>
          {newThemeName !== "Default" && (
            <Button
              onClick={() => {
                if (createNewThemeMode) {
                  console.log(
                    { pretty: prettifyJSONString(inputJSON) },
                    { inputJSON }
                  )
                  setCurrentThemeValues({
                    input: prettifyJSONString(inputJSON),
                    output: prettifyJSONString(inputJSON),
                  })
                }
                setTimeout(() => {
                  console.log({ currentThemeValues }, { inputJSON })
                  dispatch(
                    uploadTheme(
                      newThemeName,
                      currentThemeValues,
                      setCreateNewThemeMode
                    )
                  )
                  dispatch(setCurrentThemeName(newThemeName as string))
                  setCurrentThemeNameState(newThemeName)
                }, 1000)
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
          {currentThemeNameState !== "Default" && !createNewThemeMode && (
            <Button
              onClick={() => {
                dispatch(setCurrentThemeName("Default"))
                setNewThemeName("Default")
                setCurrentThemeNameState("Default")
                dispatch(deleteTheme(newThemeName))
              }}
              disabled={
                currentThemeNameState === "Default" && !createNewThemeMode
              }
              variant="contained"
              color="secondary"
            >
              DELETE
            </Button>
          )}
        </Grid>
      </Grid>

      <div className={classes.editor}>
        {!createNewThemeMode && (
          <ReactJsonEditor
            values={createMuiTheme(
              JSON.parse(getCurrentTheme(currentThemeNameState).output)
            )}
            onChange={(values) =>
              setCurrentThemeValues((prevState) => ({
                ...prevState,
                output: JSON.stringify(values),
              }))
            }
          />
        )}
      </div>
    </Fragment>
  )
}
