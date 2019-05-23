import {
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";
import red from "@material-ui/core/colors/red";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Fragment } from "react";
import * as React from "react";

import Image from "./MinjungKang.jpg";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: theme.spacing.unit * 50
    },
    avatar: {
      backgroundColor: red[500]
    }
  });

interface IPapersFullProps extends WithStyles<typeof styles> {}

export interface State {
  prayer: string;
  retreat: boolean;
  present: boolean;
}

class PapersFull extends React.Component<IPapersFullProps, State> {
  state: State = {
    prayer:
      "리더로서의 직분을 칙임감있게 감당할 수 있도록. 기도에 힘쓰고 매사에 성령님과 교제하는 삶을 살 수 있도록.",
    retreat: false,
    present: false
  };

  private handleChangeCheck = (name: keyof State) => (event: any) => {
    this.setState({ [name]: event.target.checked } as Pick<
      State,
      "retreat" | "present"
    >);
    console.log(this.state[name]);
  };

  private handleChangeText = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [name]: event.target.value } as Pick<State, "prayer">);
    console.log(this.state[name]);
  };

  public render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={1}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="강민정" src={Image} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography inline variant="h6">
                    <b>강민정</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography inline variant="body2">
                    10.09.1990
                  </Typography>
                </Grid>
              </Grid>
            }
            secondary={
              <Fragment>
                <TextField
                  id="standard-with-placeholder"
                  placeholder="기도제목"
                  value={this.state.prayer}
                  onChange={this.handleChangeText("prayer")}
                  margin="normal"
                  fullWidth
                  multiline
                />
                <FormGroup row>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.retreat}
                            onChange={this.handleChangeCheck("retreat")}
                            value="retreat"
                          />
                        }
                        label="수련회"
                      />
                    </Grid>
                    <Grid item xs>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.present}
                            onChange={this.handleChangeCheck("present")}
                            value="present"
                          />
                        }
                        label="출석"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Fragment>
            }
          />
        </ListItem>
      </Paper>
    );
  }
}

export default withStyles(styles)(PapersFull);
