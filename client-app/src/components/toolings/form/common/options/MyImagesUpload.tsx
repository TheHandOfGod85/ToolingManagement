import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  fullWidth?: boolean;
  sx?: {};
}

export default function MyImagesUpload(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      type="file"
      value={field.value == null ? "" : field.value}
      error={meta.touched && !!meta.error}
      label={props.label}
      variant={"outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
    ></TextField>
  );
}
