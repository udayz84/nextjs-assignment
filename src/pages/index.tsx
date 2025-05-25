import { Container, Typography, Box, Avatar, Button } from '@mui/material'
import { useSession, signOut } from 'next-auth/react'
import { GoogleSignIn } from '@/components/GoogleSignIn'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {session ? (
          <>
            <Avatar
              src={session.user?.image || ''}
              alt={session.user?.name || ''}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h4" component="h1">
              Welcome, {session.user?.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {session.user?.email}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => signOut()}
              sx={{ mt: 2 }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Our App
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please sign in to continue
            </Typography>
            <GoogleSignIn />
          </>
        )}
      </Box>
    </Container>
  )
} 