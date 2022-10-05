import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from '../../../libs/axios'

import useAuthentication from '../../../hooks/useAuthentication'

import { Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material'

type RegistrationInputs = {
  name: string
  surname: string
  email: string
  password: string
}

export const RegistrationForm: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const { Auth, User } = useAuthentication()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInputs>()

  const router = useRouter()

  useEffect(() => {
    User.isLoggedIn && router.push('/')
  }, [User.isLoggedIn])

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data: RegistrationInputs) => {
    try {
      const req = await axios.post('/api/signup', data)

      const { user } = await req.data
      Auth(user)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                {...register('surname', { required: true })}
                error={errors.surname ? true : false}
                helperText={errors.surname ? 'Surname is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                {...register('email', { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email ? 'Email is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
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
              {error && (
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              )}
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
  )
}
