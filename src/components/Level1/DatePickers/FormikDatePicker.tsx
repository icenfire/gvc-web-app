import InputAdornment from "@material-ui/core/InputAdornment"
import { DatePicker } from "@material-ui/pickers"
import { FieldAttributes, useField, useFormikContext } from "formik"
import React, { FC } from "react"

export const FormikDatePicker: FC<FieldAttributes<{}> & { label: string } & {
  icon: JSX.Element
}> = ({ label, placeholder, icon, ...props }) => {
  const [field, meta] = useField<{}>(props)
  const { setFieldValue } = useFormikContext()
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <DatePicker
      {...field}
      label={label}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      disableFuture
      openTo="year"
      format="dd/MM/yyyy"
      views={["year", "month", "date"]}
      fullWidth
      onChange={val => {
        setFieldValue(field.name, val)
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  )
}
