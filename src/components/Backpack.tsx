import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectShopItems } from "../store/shop/shopSlice";
import { selectUser } from "../store/user/userSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function Backpack() {
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectShopItems);
  const dispatch = useAppDispatch();
  const handleDisarm = (itemName: string) => () => {
    dispatch({ type: "user/backpack/disarm", payload: itemName });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Sac à dos</Typography>
      <Typography variant="caption">{user.backpack.length} éléments</Typography>
      <Grid
        container
        spacing={2}
        sx={{
          listStyle: "none",
        }}
      >
        {user.backpack.map((itemName) => {
          const item = items.find((item) => item.name === itemName);
          if (!item) return null;
          return (
            <Grid item xs={2} flexWrap="wrap" component="li" key={item.name}>
              <Card
                sx={{
                  aspectRatio: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  title={item.name}
                  titleTypographyProps={{ variant: "body1" }}
                />
                <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
                  <Typography variant="caption">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleDisarm(item.name)}>
                    Enlever
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
