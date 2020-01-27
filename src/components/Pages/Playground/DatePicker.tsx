import { InputAdornment } from "@material-ui/core"
import CalendarToday from "@material-ui/icons/CalendarToday"
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers"
import React from "react"

function DateOfBirthDatePicker({ dob, onChange }: any) {
  // const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
  //   new Date()
  // )

  return (
    <DatePicker
      disableFuture
      openTo="year"
      format="dd/MM/yyyy"
      label="Date of birth"
      views={["year", "month", "date"]}
      value={dob}
      onChange={() => 1}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarToday />
          </InputAdornment>
        )
      }}
    />

    // <KeyboardDatePicker
    //   clearable
    //   value={dob}
    //   placeholder="31/12/2019"
    //   disableFuture={true}
    //   // onChange={date => handleDateChange(date)}
    //   onChange={date => onChange(date)}
    //   minDate={new Date()}
    //   format="dd/MM/yyyy"
    // />
  )
}

export { DateOfBirthDatePicker }
