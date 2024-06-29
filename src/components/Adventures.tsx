import { selectAdventures } from "../store/adventures/adventureSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function Adventures() {
  const adventures = useAppSelector(selectAdventures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "adventures/fetch" });
  }, [dispatch]);
  const handleExplore = (name: string) => () => {
    dispatch({ type: "adventures/explore", payload: name });
  };
  const handleExploreAll = () => {
    dispatch({ type: "adventures/exploreAll" });
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Aventures</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="caption">{adventures.length} éléments</Typography>
        <Button size="small" onClick={handleExploreAll}>
          Explorer tout
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {adventures.map((adventure) => (
          <Grid
            item
            xs={3}
            flexWrap="wrap"
            component="li"
            key={adventure.name}
            sx={{ listStyle: "none" }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                aspectRatio: 2,
              }}
            >
              <CardHeader
                title={adventure.name}
                titleTypographyProps={{
                  variant: "body1",
                }}
                sx={{
                  flexGrow: 1,
                  alignItems: "flex-start",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              />
              <CardActions>
                <Button size="small" onClick={handleExplore(adventure.name)}>
                  Explorer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
