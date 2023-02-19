import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import ImageUploadWidget from "../../images/ImageUploadWidget";
import useTooling from "../../../app/hooks/tooling/useTooling";
import useUser from "../../../app/hooks/user/useUser";
import { theme } from "../../../app/theme/theme";

export default observer(function ToolingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const { data: user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { modalStore } = useStore();

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={20} />
        <Typography ml={1}>Loading tool...</Typography>
      </Box>
    );
  return (
    <Stack direction={"row"} justifyContent={"center"} mt={10} height={"100%"}>
      <Card sx={{ maxWidth: 445 }}>
        <CardHeader
          sx={{
            "& .MuiCardHeader-title": { fontFamily: "anton", color: "#1976D2" },
          }}
          title={`${singleTooling?.tNumber} --- ${singleTooling?.psNumber}`}
          action={
            user?.role === "Admin" ? (
              <>
                <IconButton aria-label="settings" onClick={handleMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => modalStore.openModal(<ImageUploadWidget />)}
                  >
                    Add Image
                  </MenuItem>
                </Menu>
              </>
            ) : null
          }
        />
        <CardActionArea component={Link} to={`/images/${singleTooling?.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={singleTooling?.image || "/assets/placeholder.png"}
            alt="tooling"
          />
        </CardActionArea>
        <CardContent>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            Quantity : {singleTooling?.quantity}
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            Department : {singleTooling?.department}
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            In Use : {singleTooling?.isInProduction === true ? "Yes" : "No"}
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            Impressions : {singleTooling?.numberOfImpressions}
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            Punnet Number : {singleTooling?.punnetNumber}
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"anton"}
            color={theme.palette.primary.main}
          >
            Note : {!!singleTooling?.note ? singleTooling?.note : "none"}
          </Typography>
        </CardContent>
        <CardActions>
          {user?.role === "Admin" ? (
            <>
              <Button
                component={Link}
                to={`/manage/${singleTooling?.id}`}
                size="small"
              >
                Edit
              </Button>
            </>
          ) : null}
          <Button component={Link} to={"/toolings"} size="small">
            Cancel
          </Button>
          <Button
            component={Link}
            to={`/products/${singleTooling?.id}`}
            size="small"
          >
            View Products
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
});
