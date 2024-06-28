import Backpack from "../components/Backpack";
import Greetings from "../components/Greetings";
import Profile from "../components/Profile";
import Score from "../components/Score";
import Shop from "../components/Shop";
import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Container component="main">
      <Stack flexDirection="column" spacing={6}>
        <Greetings />
        <Profile />
        <Score />
        <Backpack />
        <Shop />
        <Outlet />
      </Stack>
    </Container>
  );
}
