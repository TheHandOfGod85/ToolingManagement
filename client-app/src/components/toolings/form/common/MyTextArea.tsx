import { Textarea } from "@mui/joy";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Grid item xs={12} sm={12}>
      <TextField
        fullWidth
        {...field}
        {...props}
        error={meta.touched && !!meta.error}
        label={props.label}
        value={field.value == null ? "" : field.value}
        variant={"outlined"}
        helperText={meta.touched && meta.error ? meta.error : null}
        multiline
      ></TextField>
    </Grid>
  );
}
