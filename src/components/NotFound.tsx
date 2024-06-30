import { Button, Container, Stack, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);
  return (
    <Container component="main" sx={{ pb: 8 }}>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Typography variant="h2">Oups ! Cette page n'existe pas...</Typography>
        <Button component={Link} to="/">
          Retourner au début de l'aventure
        </Button>
      </Stack>
    </Container>
  );
}
