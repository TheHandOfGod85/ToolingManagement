import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label?: string;
  sx?: {};
}

export default function MyCheckBox(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormControlLabel
      {...field}
      {...props}
      checked={field.value}
      control={
        <Checkbox onChange={(e) => helpers.setValue(e.target.checked)} />
      }
      label={props.label}
    ></FormControlLabel>
  );
}
