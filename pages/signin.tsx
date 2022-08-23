import type { NextPage } from "next";
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

{
  /* Form input definitions */
}
type Inputs = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                {/*Email Input */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter your user ID"
                    variant="standard"
                    {...register("email", { required: true })}
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
                  />
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
                {/*RHF error display */}
                <Grid item xs={12} sx={{ color: "red" }}>
                  <Typography variant="caption" textAlign="center">
                    {errors.email && <span>* The email is required</span>}
                    {errors.password && <span>* The password is required</span>}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </AuthLayout>
  );
};

export default SignIn;
