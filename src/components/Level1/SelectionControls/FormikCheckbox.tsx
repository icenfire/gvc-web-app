import { FormControl, FormControlLabel, FormHelperText } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import { FieldAttributes, useField } from "formik"
import React, { FC } from "react"

export const FormikCheckBox: FC<FieldAttributes<{}> & { label: string }> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>({ ...props, type: "checkbox" })
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <FormControl required error={!!errorText} component="fieldset">
      <FormControlLabel
        control={<Checkbox {...field} color="primary" />}
        label={
          <Typography color="primary" variant="caption">
            {label}
          </Typography>
        }
      />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}
