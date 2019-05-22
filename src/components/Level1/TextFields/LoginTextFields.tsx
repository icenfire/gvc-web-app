import * as React from "react";

import { InputAdornment, TextField } from "@material-ui/core";

import CalendarToday from "@material-ui/icons/CalendarToday";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";

export interface ILoginTextFieldsProps {
  type: string;
}

export default class LoginTextFields extends React.Component<
  ILoginTextFieldsProps,
  any
> {
  public render() {
    return <TextField {...this.textFieldProps(this.props.type)} />;
  }

  private textFieldProps(type: string) {
    // Default properties
    interface IProps {
      [key: string]: any;
    }

    const props: IProps = {
      className: "textfield",
      margin: "normal"
    };

    switch (type) {
      case "name":
        props.id = "standard-name-input";
        props.label = "Name";
        props.margin = "normal";
        props.InputProps = {
          endAdornment: (
            <InputAdornment position="end">
              <Person />
            </InputAdornment>
          )
        };
        break;
      case "email":
        props.id = "outlined-email-input";
        props.label = "Email Address";
        props.type = "email";
        props.name = "email";
        props.autoComplete = "email";
        props.InputProps = {
          endAdornment: (
            <InputAdornment position="end">
              <Email />
            </InputAdornment>
          )
        };
        break;
      case "password":
        props.id = "standard-password-input";
        props.label = "Password";
        props.type = "password";
        props.autoComplete = "current-password";
        props.InputProps = {
          endAdornment: (
            <InputAdornment position="end">
              <Lock />
            </InputAdornment>
          )
        };
        break;
      case "dateOfBirth":
        props.id = "standard-dob-input";
        props.label = "Date Of Birth";
        props.className = "dob";
        props.type = "date";
        props.margin = "normal";
        props.InputLabelProps = {
          shrink: true
        };
        props.InputProps = {
          endAdornment: (
            <InputAdornment position="end">
              <CalendarToday />
            </InputAdornment>
          )
        };
        break;
    }
    return props;
  }
}
