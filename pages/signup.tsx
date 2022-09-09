import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { USERContext } from "../context/user";
import Link from "next/link";
import axios from "axios";
import { registration } from "../libs/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

{
  /* Form input definitions */
}
type Inputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  return (
    <AuthLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 420, backgroundColor: "primary.main" }}
        paddingY={7}
      >
        {/* Company Logo */}
        <Typography variant="h3" color="white" fontWeight="bold" textAlign="center">
          LOGO
        </Typography>

        {/*Login Form */}
        <SignupForm />
      </Box>
      {/* Links */}
      <BottomLinks />
    </AuthLayout>
  );
};

const SignupForm: FC = () => {
  const { loginUser, isLoggedIn } = useContext(USERContext);
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, name, surname } = data;

    try {
      const res = await axios.post("https://pwa-chase-api.vercel.app/api/signup", {
        email,
        password,
        name,
        surname,
      });

      const user = res.data.user;
      loginUser(
        user._id,
        user.name,
        user.surname,
        user.email,
        user.password,
        user.publicKey,
        true,
        user.webAuthnEnabled,
      );
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }),
    [isLoggedIn];

  return (
    <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: "10px" }}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/* Name Input */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter your name"
                variant="standard"
                {...register("name", { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? "Name is required" : ""}
              />
            </Grid>
            {/* Surname Input */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Enter your surname"
                variant="standard"
                {...register("surname", { required: true })}
                error={errors.surname ? true : false}
                helperText={errors.surname ? "Surname is required" : ""}
              />
            </Grid>
            {/*Email Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="standard"
                {...register("email", { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email ? "Email is required" : ""}
              />
            </Grid>
            {/*Password Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your password"
                variant="standard"
                type="password"
                {...register("password", { required: true })}
                error={errors.password ? true : false}
                helperText={errors.password ? "Password is required" : ""}
              />
            </Grid>
            {/*Submit button */}
            <Grid item xs={12}>
              {error && (
                <Typography color="error" textAlign="center">
                  Something was wrong
                </Typography>
              )}
              <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

const BottomLinks: FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2} flexWrap="wrap">
      <Link href="/about">
        <Typography color="primary.main" fontWeight="bold" component="a">
          About
        </Typography>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="/signin">
        <Typography color="primary.main" fontWeight="bold" component="a">
          ¿Already have an account?
        </Typography>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="/privacy">
        <Typography color="primary.main" fontWeight="bold" component="a">
          Privacy
        </Typography>
      </Link>
    </Box>
  );
};

export default SignUp;

/*
  const credential = await navigator.credentials.create({
        publicKey: {
          rp: {
            name: "Chase",
          },
          user: {
            id: new TextEncoder().encode(user._id),
            name: user.name,
            displayName: user.name,
          },
          challenge: new TextEncoder().encode("challenge"),
          pubKeyCredParams: [
            {
              type: "public-key",
              alg: -7,
            },
          ],
          authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
            requireResidentKey: false,
            userVerification: "preferred",
          },
          timeout: 60000,
          attestation: "direct",
        },
      });
*/