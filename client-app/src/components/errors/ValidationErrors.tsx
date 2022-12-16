import { Alert, List, ListItem } from "@mui/material";

interface Props {
  errors: any;
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <>
      {errors.map((err: any, i: any) => (
        <Alert sx={{ m: 1 }} severity="error" key={i}>
          {err}
        </Alert>
      ))}
    </>
  );
}
