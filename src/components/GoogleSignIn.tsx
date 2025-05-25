import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'
import GoogleIcon from '@mui/icons-material/Google'

export const GoogleSignIn = () => {
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleSignIn}
      sx={{
        backgroundColor: '#fff',
        color: '#757575',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      Sign in with Google
    </Button>
  )
} 