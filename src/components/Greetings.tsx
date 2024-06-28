import { Stack, Typography } from "@mui/material";

export default function Greetings() {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h1" width="auto">
        Adventure Crawler
      </Typography>
      <Typography variant="subtitle1">
        L'aventure ne fait que commencer...
      </Typography>
    </Stack>
  );
}
