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
import React, { FormEvent, useState } from "react";
import ContentWrapper from "../components/common/layout/ContentWrapper";
import useRegisterForm from "../hooks/auth/useRegisterForm";

const Register = () => {
  const router = useRouter();
  const [register, getValues, onSubmit, errors] = useRegisterForm();
  const [passConfirm, setPassConfirm] = useState("");
  const [passConfirmError, setPassConfirmError] = useState<string | null>(null);

  const handleRegister = () => {
    router.push("/experiments");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passConfirm === getValues().password) {
      onSubmit(handleRegister);
    } else {
      setPassConfirmError("Passwords do not match");
    }
  };

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex", mx: "auto", mt: 8 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Card
            variant="outlined"
            sx={{ width: (theme) => theme.breakpoints.values.sm }}
          >
            <CardContent>
              <CardHeader
                title={
                  <Typography variant="h4" textAlign="center">
                    Register
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
                  required
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
                  required
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  sx={{ width: "66%" }}
                />
                <TextField
                  label="Password confirmation"
                  type="password"
                  error={Boolean(passConfirmError)}
                  helperText={passConfirmError}
                  required
                  onChange={(e) => setPassConfirm(e.target.value)}
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
                Register
              </Button>
              <Link href="/login">
                <Button variant="text" size="large">
                  Log in instead
                </Button>
              </Link>
            </CardActions>
          </Card>
        </form>
      </Box>
    </ContentWrapper>
  );
};

export default Register;
