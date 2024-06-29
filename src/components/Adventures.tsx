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
      <Grid container spacing={2}>
        {adventures.map((adventure) => {
          const explorations = user.logs.filter(
            (log) => log.adventure === adventure.name,
          );
          return (
            <Grid
              item
              xs={12}
              md={4}
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
                />
                <CardContent>
                  <Typography variant="caption">
                    {explorations.length > 0
                      ? `${explorations.length} explorations`
                      : "Pas encore explorée"}
                  </Typography>
                </CardContent>
                <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
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
