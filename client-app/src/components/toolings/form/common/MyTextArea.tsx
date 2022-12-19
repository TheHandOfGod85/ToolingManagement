import { Textarea } from "@mui/joy";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
  fullwidth?: string;
  sx?: {};
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      label={props.label}
      value={field.value == null ? "" : field.value}
      variant={"outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
      multiline
      sx={{ minWidth: 300 }}
    ></TextField>
  );
}
