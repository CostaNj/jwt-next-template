import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useQuery } from 'react-query'
import { registration } from "../api/auth"

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('test')
  const [password, setPassword] = useState<string>('test')

  const { data, isRefetching, refetch } = useQuery('registration', async () => await registration(email, password))

  const handleClickRegistration = useCallback(() => {
    refetch()
  }, [email, password])

  return(
    <Box
      sx={{
        width: 300,
        height: 200,
        border: '1px solid #eee',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
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
  )
}