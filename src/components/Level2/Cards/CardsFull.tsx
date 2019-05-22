import * as React from "react";
import { Fragment } from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Image from "./MinjungKang.jpg";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 400
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    actions: {
      display: "flex"
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: "auto",
      [theme.breakpoints.up("sm")]: {
        marginRight: -8
      }
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  });

interface ICardsFullProps extends WithStyles<typeof styles> {}

const Title = (
  <Grid container alignItems="center">
    <Grid item xs>
      <Typography>강민정</Typography>
    </Grid>
    <Grid item>
      <Typography>10.09.1990</Typography>
    </Grid>
  </Grid>
);

class CardsFull extends React.Component<
  ICardsFullProps,
  { expanded: boolean }
> {
  public state = { expanded: false };

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
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
          <Typography component="p">
            리더로의의지직분을 칙임감있게 감당할 수 있도록. 기도에 힘쓰고 매사에
            성령님과 교제하는 삶을 살 수 있도록.
          </Typography>
          <li>
            <Divider variant="inset" />
          </li>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing={true}>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
          <CardContent>
            <Typography paragraph={true}>Method:</Typography>
            <Typography paragraph={true}>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph={true}>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph={true}>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(CardsFull);
