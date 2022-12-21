import {
  Box,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
  sx?: {};
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Stack alignItems={"center"}>
      <Select
        {...field}
        {...props}
        error={meta.touched && !!meta.error}
        label={props.label}
        variant={"outlined"}
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
      </Select>
      <FormHelperText error sx={{ mt: -1.5 }}>
        {meta.touched && meta.error ? meta.error : null}
      </FormHelperText>
    </Stack>
  );
}
