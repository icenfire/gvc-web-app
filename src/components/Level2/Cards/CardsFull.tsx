import * as React from "react";
import { Fragment } from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Image from "./MinjungKang.jpg";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 400
    },
    avatar: {
      backgroundColor: red[500]
    }
  });

interface ICardsFullProps extends WithStyles<typeof styles> {}

export interface State {
  prayer: string;
  retreat: boolean;
  present: boolean;
}

class CardsFull extends React.Component<ICardsFullProps, State> {
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
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              src={Image}
              alt="강민정"
              className={classes.avatar}
            />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          // title={Title}
          title="강민정"
          subheader="10.09.1990"
        />
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CardsFull);
