import Box from '@mui/material/Box'
import type { NextPage } from 'next'

import { LoginForm } from '../client/containers/login-form'

const Auth: NextPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-atart',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default Auth
