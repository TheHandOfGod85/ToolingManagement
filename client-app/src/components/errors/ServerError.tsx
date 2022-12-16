import { Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
  const { commonStore } = useStore();
  return (
    <Stack sx={{ mt: 2, ml: 1, mr: 1 }}>
      <Typography variant="h4">Server Error</Typography>
      <Typography variant="h6" color={"red"}>
        {commonStore.error?.message}
      </Typography>
      {commonStore.error?.details && (
        <Stack>
          <Paper>
            <Typography variant="h6" color={"teal"}>
              Stack Trace
            </Typography>
            <code style={{ marginTop: "10px" }}>
              {commonStore.error.details}
            </code>
          </Paper>
        </Stack>
      )}
    </Stack>
  );
});
