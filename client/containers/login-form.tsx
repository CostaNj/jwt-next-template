import { useCallback, useState, ChangeEvent } from 'react'
import { Box, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useQuery } from 'react-query'
import { registration } from "../api/auth"

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('test@test6.ru')
  const [password, setPassword] = useState<string>('test')

  const { data, isRefetching, refetch } = useQuery('registration', async () => await registration(email, password))

  const handleClickRegistration = useCallback(() => {
    refetch()
  }, [email, password])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return(
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
          loading={isRefetching}
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