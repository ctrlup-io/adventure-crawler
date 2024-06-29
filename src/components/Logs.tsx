import { useAppSelector } from "../store/hook";
import { selectUser } from "../store/user/userSlice";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function Logs() {
  const user = useAppSelector(selectUser);
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Carnet de bord</Typography>
      <Typography variant="caption">{user.logs.length} éléments</Typography>
      <Grid container spacing={2}>
        {user.logs.map((log) => (
          <Grid
            item
            xs={12}
            md={4}
            flexWrap="wrap"
            component="li"
            key={`${log.createdAt}-${log.adventure}-${log.score}`}
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
                title={log.adventure}
                titleTypographyProps={{
                  variant: "body1",
                }}
                subheader={`${log.score}pts`}
              />
              <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
                <Typography variant="caption" whiteSpace="pre-wrap">
                  {log.report}
                </Typography>
                <br />
                {log.backpack.initialItems.length > 0 && (
                  <>
                    <Typography variant="caption">
                      Équipements de départ :{" "}
                      {log.backpack.initialItems.join(", ")}
                    </Typography>
                    <br />
                    <br />
                  </>
                )}
                {log.backpack.newItems.length > 0 && (
                  <>
                    <Typography variant="caption">
                      Nouveaux équipements : {log.backpack.newItems.join(", ")}
                    </Typography>
                    <br />
                    <br />
                  </>
                )}
                {log.backpack.lostItems.length > 0 && (
                  <>
                    <Typography variant="caption">
                      Équipements perdus : {log.backpack.lostItems.join(", ")}
                    </Typography>
                    <br />
                    <br />
                  </>
                )}
                <Typography variant="caption">
                  {new Intl.RelativeTimeFormat("fr", {
                    style: "short",
                  }).format(
                    Math.floor(
                      (new Date(log.createdAt).getTime() - Date.now()) / 1000,
                    ),
                    "seconds",
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
