import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import * as React from "react"

class RememberMeCheckbox extends React.PureComponent {
  public state = {
    checked: true
  }

  public render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleChange}
            value="checked"
            color="primary"
          />
        }
        label={
          <Typography color="primary" variant="caption">
            Remember me
          </Typography>
        }
      />
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ checked: event.target.checked })
  }
}

export default RememberMeCheckbox
