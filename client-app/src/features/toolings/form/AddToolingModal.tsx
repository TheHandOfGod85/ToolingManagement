import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddToolingModal({ open, onClose }: Props) {
  const departments = ["Fruit", "Salad", "Stir Fry", ""];
  const [department, setDepartment] = useState("");
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
        <DialogTitle>Add New Tooling</DialogTitle>
        <Grid
        container
          direction={"column"}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Grid container m={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label={"PS Number"}
                type={"text"}
                placeholder={"Enter the PS Number"}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{ ml: 1 }}
                label={"T Number"}
                type={"text"}
                placeholder={"Enter the T Number"}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container m={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label={"Quantity"}
                type={"text"}
                placeholder={"Enter how many sets"}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                sx={{ ml: 1 }}
                label={"Department"}
                value={department}
                onChange={handelChange}
                helperText="Please select department"
              >
                {departments.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            m={2}
            direction="row"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                type={"text"}
                label={"Punnet Number"}
                placeholder={"Enter Punnet Number"}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ ml: 1 }}
                fullWidth
                type={"text"}
                label={"Product"}
                placeholder={"Enter Products used"}
              ></TextField>
            </Grid>
          </Grid>
          <FormControlLabel
            label={"In Use"}
            control={<Checkbox sx={{ ml: 1.82 }} />}
          ></FormControlLabel>
          <Grid container m={2}>
            <ButtonGroup>
              <Button variant="contained">Submit</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
