import { selectAdventures } from "../store/adventures/adventureSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
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
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function Adventures() {
  const adventures = useAppSelector(selectAdventures);
  const user = useAppSelector(selectUser);
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
        {adventures.length > 0 && (
          <Button size="small" onClick={handleExploreAll}>
            Explorer tout
          </Button>
        )}
      </Stack>
      <Grid
        container
        spacing={{ xs: 0, md: 4 }}
        gap={{ xs: 4, md: 0 }}
        component="ol"
        sx={{ margin: 0, padding: 0, listStyle: "none" }}
      >
        {adventures.map((adventure) => {
          const explorations = user.logs.filter(
            (log) => log.adventure === adventure.name,
          );
          return (
            <Grid item xs={12} md={4} component="li" key={adventure.name}>
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
                />
                <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
                  <Typography variant="caption">
                    {explorations.length > 0
                      ? `${explorations.length} explorations`
                      : "Pas encore explorée"}
                  </Typography>
                  <br />
                  <Table size="small">
                    <TableBody>
                      {explorations.map((exploration) => (
                        <TableRow
                          key={`${exploration.createdAt}-${exploration.score}`}
                        >
                          <TableCell>
                            <Typography variant="caption">
                              {new Intl.RelativeTimeFormat("fr", {
                                style: "short",
                              }).format(
                                Math.floor(
                                  (new Date(exploration.createdAt).getTime() -
                                    Date.now()) /
                                    1000,
                                ),
                                "seconds",
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {exploration.score}pts
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardActions>
                  {explorations.length > 0 && (
                    <Chip
                      size="small"
                      variant="outlined"
                      color="success"
                      icon={<Check />}
                      label="Explorée"
                    />
                  )}
                  <Button size="small" onClick={handleExplore(adventure.name)}>
                    {explorations.length > 0
                      ? "Explorer à nouveau"
                      : "Explorer"}
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
