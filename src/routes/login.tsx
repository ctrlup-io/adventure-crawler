import type { User } from "../api/types";
import Greetings from "../components/Greetings";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectUser } from "../store/user/userSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";

interface LoginFormValues extends User {}

export default function Login() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormValues>({
    defaultValues: { name: "", password: "" },
  });
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    dispatch({ type: "user/logIn", payload: data });
  };
  if (user.registered) {
    return <Navigate to="/" />;
  }
  return (
    <Container component="main" sx={{ pb: 8 }}>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Greetings />
        <Card>
          <CardContent>
            <Stack
              spacing={2}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Requis",
                  pattern: {
                    value: /^\S*$/,
                    message: "Ne doit pas contenir d'espace",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nom d'utilisateur"
                    aria-invalid={errors.name ? "true" : "false"}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message || " "}
                  />
                )}
                disabled={isLoading}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Requis",
                  pattern: {
                    value: /^\S*$/,
                    message: "Ne doit pas contenir d'espace",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mot de passe"
                    type="password"
                    aria-invalid={errors.password ? "true" : "false"}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message || " "}
                  />
                )}
                disabled={isLoading}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading || Boolean(errors.name || errors.password)}
            >
              Démarrer l'aventure
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}
