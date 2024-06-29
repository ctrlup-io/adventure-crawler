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
  const handleDisarmAll = () => {
    dispatch({ type: "user/backpack/disarmAll" });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Sac à dos</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="caption">
          {user.backpack.length} éléments
        </Typography>
        {user.backpack.length >= 10 && (
          <Typography variant="caption" color="error">
            sac à dos plein
          </Typography>
        )}
        <Button size="small" onClick={handleDisarmAll}>
          Enlever tout
        </Button>
      </Stack>
      <Grid
        container
        spacing={2}
        sx={{
          listStyle: "none",
        }}
      >
        {user.backpack.map((itemName) => {
          const item = items.find((item) => item.name === itemName);
          return (
            <Grid item xs={3} flexWrap="wrap" component="li" key={itemName}>
              <Card
                sx={{
                  aspectRatio: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  title={itemName}
                  titleTypographyProps={{ variant: "body1" }}
                />
                <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
                  <Typography
                    variant="caption"
                    color={item ? "default" : "error"}
                  >
                    {item?.description || "Objet introuvable dans le magasin"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleDisarm(itemName)}>
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
