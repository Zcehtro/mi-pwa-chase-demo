import { FC, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { USERContext, UserModel } from '../../../context/user';

import { Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';

type Inputs = {
  email: string;
  password: string;
};

const TEST_USER = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  email: 'jhondoe@123.com',
  password: '123456',
  publicKey: '123456',
  isLoggedIn: true,
  webAuthnEnabled: false,
};

export const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { loginUser, isLoggedIn } = useContext(USERContext);
  const router = useRouter();

  //UseEffect Hook Calls
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    let TEST_USER = {
      id: '1',
      name: 'John',
      surname: 'Doe',
      password: '123456',
      email: data.email,
      publicKey: '123456',
      isLoggedIn: true,
      webAuthnEnabled: false,
    };
    localStorage.setItem('savedEmail', data.email);
    console.log('[DEBUG] Email saved to localStorage: ' + data.email);
    loginUser(TEST_USER);
  };

  return (
    <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="standard"
                {...register('email', { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email ? 'Email is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your password"
                variant="standard"
                type="password"
                {...register('password', { required: true })}
                error={errors.password ? true : false}
                helperText={errors.password ? 'Password is required' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <Checkbox defaultChecked />
              <Typography variant="caption" color="primary">
                Remember me
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
              <Link href="/forgot-password">
                <Typography variant="caption" color="primary">
                  ¿Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit" sx={{ my: 2 }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
