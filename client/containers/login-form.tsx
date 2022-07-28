import { ChangeEvent, useCallback, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, TextField } from '@mui/material'

import { login, registration } from '../api/auth'
import { useAppContext } from '../context'
import { errorHandler } from '../utils/error-handlers'

export const LoginForm = () => {
  const { setUserData } = useAppContext()
  const router = useRouter()
  const [email, setEmail] = useState<string>('test@test6.ru')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('test')
  const [passwordError, setPasswordError] = useState<string>('')

  const { refetch, isLoading } = useQuery<AxiosResponse, AxiosError>(
    'registration',
    async () => await registration(email, password),
    {
      onSuccess: (response) => {
        const token = response?.data?.accessToken
        const user = response?.data?.user
        if (token && user) {
          localStorage.setItem('token', token)
          setUserData(user)
          setEmail('')
          setPassword('')
        }
      },
      onError: errorHandler([
        { fieldName: 'email', setError: setEmailError },
        { fieldName: 'password', setError: setPasswordError }
      ])
    }
  )

  const { refetch: loginRefetch, isLoading: loginLoading } = useQuery(
    'login',
    async () => await login(email, password),
    {
      onSuccess: (response) => {
        const token = response?.data?.accessToken
        const user = response?.data?.user
        if (token && user) {
          localStorage.setItem('token', token)
          setUserData(user)
          router.push('/')
        }
      }
    }
  )

  const handleClickRegistration = useCallback(() => {
    refetch()
  }, [email, password, isLoading, refetch])

  const handleClickLogin = useCallback(() => {
    loginRefetch()
  }, [email, password, loginLoading, loginRefetch])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setEmailError('')
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  return (
    <Box
      sx={{
        width: 300,
        height: 200,
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <TextField
        id="email-input"
        label="Email"
        type="email"
        autoComplete="current-email"
        value={email}
        onChange={handleChangeEmail}
        sx={{ width: '100%' }}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        id="password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChangePassword}
        sx={{ width: '100%' }}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <LoadingButton
          size="small"
          onClick={handleClickLogin}
          loading={loginLoading}
          loadingIndicator="Loading…"
          variant="outlined"
          sx={{ height: '30px' }}
        >
          Login
        </LoadingButton>
        <LoadingButton
          size="small"
          onClick={handleClickRegistration}
          loading={isLoading}
          loadingIndicator="Loading…"
          variant="outlined"
          sx={{ height: '30px' }}
        >
          Registration
        </LoadingButton>
      </Box>
    </Box>
  )
}
