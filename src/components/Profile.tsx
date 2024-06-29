import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectUserScore } from "../store/score/scoreSlice";
import { reset, selectUser } from "../store/user/userSlice";
import { Button, Stack, Typography } from "@mui/material";

export default function Profile() {
  const user = useAppSelector(selectUser);
  const score = useAppSelector(selectUserScore);
  const dispatch = useAppDispatch();
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
      <Typography variant="h2">{score}pts</Typography>
      <Button size="small" color="inherit" onClick={quit}>
        Quitter l'aventure
      </Button>
    </Stack>
  );
}
