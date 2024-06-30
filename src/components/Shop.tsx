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
  const handleDisarm = (itemName: string) => () => {
    dispatch({ type: "user/backpack/disarm", payload: itemName });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Magasin</Typography>
      <Typography variant="caption">{items.length} éléments</Typography>
      <Grid
        container
        spacing={{ xs: 0, md: 4 }}
        gap={{ xs: 4, md: 0 }}
        component="ol"
        sx={{ margin: 0, padding: 0, listStyle: "none" }}
      >
        {items.map((item) => {
          const equiped = user.backpack.includes(item.name);
          return (
            <Grid item xs={12} md={3} component="li" key={item.name}>
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
                  {equiped ? (
                    <>
                      <Chip
                        size="small"
                        variant="outlined"
                        color="success"
                        icon={<Check />}
                        label="Équipé"
                      />
                      <Button size="small" onClick={handleDisarm(item.name)}>
                        Enlever
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="small"
                      onClick={handleEquip(item.name)}
                      disabled={user.backpack.length >= 10}
                    >
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
