import { useAppSelector } from "../store/hook";
import { reset, selectUser } from "../store/user/userSlice";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Profile() {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const quit = () => {
    dispatch(reset());
  };
  if (!user) return null;
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h1" component="span" role="img">
        🧙‍♂️
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {user.name}
      </Typography>
      <Button size="small" color="inherit" onClick={quit}>
        Quitter l'aventure
      </Button>
    </Stack>
  );
}
