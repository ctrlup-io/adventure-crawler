import { useAppSelector } from "../store/hook";
import { selectUser } from "../store/user/userSlice";
import {
  Card,
  CardActions,
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
            xs={4}
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
                <Typography whiteSpace="pre-wrap">{log.report}</Typography>
              </CardContent>
              <CardActions>
                <Typography variant="caption">
                  {new Intl.RelativeTimeFormat("fr").format(
                    Math.floor(
                      (new Date(log.createdAt).getTime() - Date.now()) / 1000,
                    ),
                    "seconds",
                  )}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
