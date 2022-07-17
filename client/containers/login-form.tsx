import LoadingButton from '@mui/lab/LoadingButton'
import { Box, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import { useQuery } from 'react-query'

import { registration } from '../api/auth'
import { useAppContext } from '../context'

export const LoginForm = () => {
  const { setUserData } = useAppContext()
  const [email, setEmail] = useState<string>('test@test6.ru')
  const [password, setPassword] = useState<string>('test')

  const { refetch, isLoading } = useQuery(
    'registration',
    async () => await registration(email, password),
    {
      onSuccess: (response) => {
        const token = response?.data?.accessToken
        const user = response?.data?.user
        if (token && user) {
          localStorage.setItem('token', token)
          setUserData(user)
        }
      }
    }
  )

  const handleClickRegistration = useCallback(() => {
    refetch()
  }, [email, password, isLoading, refetch])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <Box
      sx={{
        width: 300,
        height: 200,
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
      />
      <TextField
        id="password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChangePassword}
        sx={{ width: '100%' }}
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
