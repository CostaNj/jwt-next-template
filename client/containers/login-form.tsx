import LoadingButton from '@mui/lab/LoadingButton'
import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'

import { useLogin } from '../hooks/login'
import { useRegistration } from '../hooks/registration'
import { errorHandler } from '../utils/error-handlers'

export const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('test@test6.ru')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('test')
  const [passwordError, setPasswordError] = useState<string>('')

  const { mutate: registrationMutate, isLoading: registrationLoading } =
    useRegistration(
      { email, password },
      {
        onSuccess: () => {
          setEmail('')
          setPassword('')
        },
        onError: errorHandler([
          { fieldName: 'email', setError: setEmailError },
          { fieldName: 'password', setError: setPasswordError }
        ])
      }
    )

  const { mutate: loginMutate, isLoading: loginLoading } = useLogin(
    { email, password },
    {
      onSuccess: () => {
        router.push('/')
      },
      onError: errorHandler([{ fieldName: 'email', setError: setEmailError }])
    }
  )

  const handleClickRegistration = useCallback(() => {
    registrationMutate()
  }, [email, password, registrationLoading])

  const handleClickLogin = useCallback(() => {
    loginMutate()
  }, [email, password, loginLoading])

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
          loading={registrationLoading}
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
