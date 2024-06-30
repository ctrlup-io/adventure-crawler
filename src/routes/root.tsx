import Greetings from "../components/Greetings";
import NavigationTab from "../components/NavigationTab";
import Profile from "../components/Profile";
import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Container component="main" sx={{ pb: 8 }}>
      <Stack flexDirection="column" spacing={6}>
        <Greetings />
        <Profile />
        <NavigationTab />
        <Outlet />
      </Stack>
    </Container>
  );
}
