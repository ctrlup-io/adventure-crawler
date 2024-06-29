import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectScore } from "../store/score/scoreSlice";
import { selectUser } from "../store/user/userSlice";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function Score() {
  const user = useAppSelector(selectUser);
  const score = useAppSelector(selectScore);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "score/fetch" });
  }, [dispatch]);
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Tableau des scores</Typography>
      {score.updatedAt && (
        <Typography variant="caption">
          mise à jour{" "}
          {new Intl.RelativeTimeFormat("fr").format(
            Math.floor(
              (new Date(score.updatedAt).getTime() - Date.now()) / 1000,
            ),
            "seconds",
          )}
        </Typography>
      )}
      {score.rows.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>nom</TableCell>
              <TableCell>pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {score.rows.map((row, index) => (
              <TableRow key={row.name} selected={row.name === user.name}>
                <TableCell>#{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="caption">Auncun score</Typography>
      )}
    </Stack>
  );
}
