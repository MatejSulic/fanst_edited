import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import ContentWrapper from "../components/common/layout/ContentWrapper";
import useLoginForm from "../hooks/auth/useLoginForm";

const Login = () => {
  const router = useRouter();
  const [register, onSubmit, errors] = useLoginForm();

  const handleLogin = () => {
    router.push("/experiments");
  };

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex", mx: "auto", mt: 8 }}>
        <form onSubmit={onSubmit(handleLogin)}>
          <Card
            variant="outlined"
            sx={{ width: (theme) => theme.breakpoints.values.sm }}
          >
            <CardContent>
              <CardHeader
                title={
                  <Typography variant="h4" textAlign="center">
                    Login
                  </Typography>
                }
              />
              <Stack
                spacing={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  label="Email"
                  type="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  sx={{ width: "66%" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  sx={{ width: "66%" }}
                />
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pb: 4,
                gap: 2,
              }}
            >
              <Button variant="contained" type="submit" size="large">
                Login
              </Button>
              <Link href="/register">
                <Button variant="text" size="large">
                  Register
                </Button>
              </Link>
            </CardActions>
          </Card>
        </form>
      </Box>
    </ContentWrapper>
  );
};

export default Login;
