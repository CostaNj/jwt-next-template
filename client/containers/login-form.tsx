import { Button, Box } from '@mui/material'

export const LoginForm = () => {
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
      <Button variant="outlined" sx={{ height: '30px' }}>Registration</Button>
    </Box>
  )
}