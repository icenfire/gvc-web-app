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
      onChange={onChange}
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
    //   placeholder="dd/mm/yyyy"
    //   label="Date of birth"
    //   disableFuture
    //   // onChange={date => handleDateChange(date)}
    //   onChange={date => onChange(date)}
    //   format="dd/MM/yyyy"
    //   fullWidth
    // />
  )
}

export { DateOfBirthDatePicker }
