import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, FC, useContext, useEffect, useState } from "react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { USERContext } from "../context/user";
import Link from "next/link";
import { platformAuthenticatorIsAvailable, browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { authenticate, registration } from "../libs/auth";
import axios from "axios";
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
        paddingY={7}
      >
        {/* Company Logo */}
        <Typography variant="h3" color="white" fontWeight="bold" textAlign="center">
          LOGO
        </Typography>

        {/*Login Form */}
        <LoginForm />
      </Box>
      {/* Links */}
      <BottomLinks />
    </AuthLayout>
  );
};

const LoginForm: FC = () => {
  const { loginUser, logoutUser, isLoggedIn, registerWebauthn, email } = useContext(USERContext);
  const [webAuthnModal, setWebAuthnModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post("https://pwa-chase-api.vercel.app/api/signin", {
        email,
        password,
      });

      const user = res.data.user;

      const webAuthnAvailable = await platformAuthenticatorIsAvailable();

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
      if (!user.webAuthnEnabled && webAuthnAvailable) {
        setWebAuthnModal(true);
      }

      //if is webauthn enabled
    } catch (error) {
      console.log(error);
    }
  };

  const WebauthnRegistration = async () => {
    registration().then((success) => {
      console.log("WebAuthn Registration Success:", success);
      router.push("/");
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: "https://pwa-chase-api.vercel.app/api/enablewebauthn",
        data: {
          email,
        },
      });
    });
  };
  useEffect(() => {
    if (!webAuthnModal && isLoggedIn) router.push("/");
  }),
    [isLoggedIn];

  return (
    <Fragment>
      {webAuthnModal ? (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: "10px" }}>
          <CardContent>
            <Typography variant="h5" color="primary" fontWeight="bold" textAlign="center">
              WebAuthn
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography
              variant="body1"
              color="#555"
              fontSize="15px"
              fontWeight="bold"
              textAlign="center"
            >
              ¿Do you want to register WebAuthn for 2fa?
            </Typography>
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={WebauthnRegistration}>
              Yes
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              //on click navigate to home
              onClick={() => router.push("/")}
            >
              No
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: "10px" }}>
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
                {/*Remember Me Checkbox */}
                <Grid item xs={6}>
                  <Checkbox defaultChecked />
                  <Typography variant="caption" color="primary">
                    Remember me
                  </Typography>
                </Grid>
                {/*Use token checkbox */}
                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                  <Link href="/forgot-password">
                    <Typography variant="caption" color="primary">
                      ¿Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                {/*Submit button */}
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Fragment>
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
      <Link href="/signup">
        <Typography color="primary.main" fontWeight="bold" component="a">
          Open an Account
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

export default SignIn;

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
