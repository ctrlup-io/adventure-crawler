import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectShopItems } from "../store/shop/shopSlice";
import { selectUser } from "../store/user/userSlice";
import { Check } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function Store() {
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectShopItems);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "shop/fetch" });
  }, [dispatch]);
  const handleEquip = (itemName: string) => () => {
    dispatch({ type: "user/backpack/equip", payload: itemName });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Magasin</Typography>
      <Typography variant="caption">{items.length} éléments</Typography>
      <Grid
        container
        spacing={2}
        sx={{
          listStyle: "none",
        }}
      >
        {items.map((item) => {
          const equiped = user.backpack.includes(item.name);
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
                <CardContent sx={{ flexGrow: 1, overflowY: "scroll" }}>
                  <Typography variant="caption">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  {equiped ? (
                    <Chip
                      size="small"
                      variant="outlined"
                      color="success"
                      icon={<Check />}
                      label="Équipé"
                    />
                  ) : (
                    <Button size="small" onClick={handleEquip(item.name)}>
                      Équiper
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
