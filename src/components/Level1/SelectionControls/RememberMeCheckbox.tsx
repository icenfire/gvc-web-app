import * as React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class RememberMeCheckbox extends React.PureComponent {
  public state = {
    checked: true
  };

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
        label="Remember me"
      />
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ checked: event.target.checked });
  };
}

export default RememberMeCheckbox;
