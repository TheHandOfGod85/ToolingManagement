import {
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
  sx?: {};
  InputProps?:{};
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      select
      error={meta.touched && !!meta.error}
      label={props.label}
      variant={"outlined"}
      value={field.value == null ? "" : field.value}
      onChange={(e) => helpers.setValue(e.target.value)}
      onBlur={() => helpers.setTouched(true)}
      placeholder={props.placeholder}
      helperText={meta.touched && meta.error ? meta.error : null}
    >
      {props.options.map((option: any) => (
        <MenuItem key={option.key} value={option.value}>
          <ListItemText primary={option.value} />
        </MenuItem>
      ))}
    </TextField>
  );
}
