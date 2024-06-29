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
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Aventures</Typography>
      <Typography variant="caption">{adventures.length} éléments</Typography>
      <Grid container spacing={2}>
        {adventures.map((adventure) => (
          <Grid
            item
            xs={2}
            flexWrap="wrap"
            component="li"
            key={adventure.name}
            sx={{ listStyle: "none" }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                aspectRatio: 1,
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
