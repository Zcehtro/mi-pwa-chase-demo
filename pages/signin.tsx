import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../components/layouts";
import { useForm, SubmitHandler } from "react-hook-form";
import { USERContext } from "../context/user";

{
  /* Form input definitions */
}
type Inputs = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  return (
    <AuthLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 420, backgroundColor: "primary.main" }}
      >
        {/* Company Logo */}
        <Typography
          variant="h3"
          color="white"
          fontWeight="bold"
          textAlign="center"
        >
          LOGO
        </Typography>

        {/*Login Form */}
        <LoginForm />
      </Box>
    </AuthLayout>
  );
};

const LoginForm: FC = () => {
  const { loginUser, isLoggedIn } = useContext(USERContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    loginUser("1", data.email, data.password);
  };

  useEffect(() => {
    if (!isLoggedIn) router.push("/signin");
  }),
    [isLoggedIn];

  return (
    <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3 }}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/*Email Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="standard"
                {...register("email", { required: true })}
              />
              <Typography variant="caption" color="error">
                {errors.email && "* Email is required"}
              </Typography>
            </Grid>
            {/*Password Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your password"
                variant="standard"
                type="password"
                {...register("password", { required: true })}
              />
              <Typography variant="caption" color="error">
                {errors.password && "* Password is required"}
              </Typography>
            </Grid>
            {/*Remember Me Checkbox */}
            <Grid item xs={6}>
              <Checkbox defaultChecked /> Remember me
            </Grid>
            {/*Use token checkbox */}
            <Grid item xs={6}>
              <Checkbox /> Use token
            </Grid>
            {/*Submit button */}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
