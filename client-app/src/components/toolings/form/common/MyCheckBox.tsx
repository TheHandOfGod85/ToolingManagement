import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useField } from "formik";
import { theme } from "../../../../app/theme/theme";

interface Props {
  name: string;
  label?: string;
  sx?: {};
  inputProps?: {};
}

export default function MyCheckBox(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormControlLabel
      sx={{
        "& .MuiFormControlLabel-label ": {
          fontFamily: "anton",
          color: "#1976D2",
        },
      }}
      {...field}
      {...props}
      checked={field.value == null ? false : field.value}
      control={
        <Checkbox onChange={(e) => helpers.setValue(e.target.checked)} />
      }
      label={props.label}
    ></FormControlLabel>
  );
}
