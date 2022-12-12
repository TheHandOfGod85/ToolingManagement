import { Grid, MenuItem, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        select
        {...field}
        {...props}
        error={meta.touched && !!meta.error}
        label={props.label}
        variant={"outlined"}
        helperText={meta.touched && meta.error ? meta.error : null}
        value={field.value == null ? "" : field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      >
        {props.options.map((option: any) => (
          <MenuItem key={option.key} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}
