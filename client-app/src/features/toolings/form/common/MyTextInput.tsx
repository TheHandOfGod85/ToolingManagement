import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        {...field}
        {...props}
        value={field.value == null ? "" : field.value}
        error={meta.touched && !!meta.error}
        label={props.label}
        variant={"outlined"}
        helperText={meta.touched && meta.error ? meta.error : null}
      ></TextField>
    </Grid>
  );
}
