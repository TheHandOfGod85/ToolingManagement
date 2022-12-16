import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  fullWidth?: boolean;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      value={field.value == null ? "" : field.value}
      error={meta.touched && !!meta.error}
      label={props.label}
      variant={"outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
      sx={{ minWidth: 300 }}
    ></TextField>
  );
}
