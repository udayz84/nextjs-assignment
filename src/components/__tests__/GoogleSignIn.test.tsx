import { render, screen, fireEvent } from '@testing-library/react'
import { GoogleSignIn } from '../GoogleSignIn'
import { SessionProvider } from 'next-auth/react'
import { signIn } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  SessionProvider: ({ children }) => <>{children}</>,
}))

describe('GoogleSignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the sign in button', () => {
    render(
      <SessionProvider>
        <GoogleSignIn />
      </SessionProvider>
    )
    
    const signInButton = screen.getByRole('button', { name: /sign in with google/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('calls signIn when button is clicked', () => {
    render(
      <SessionProvider>
        <GoogleSignIn />
      </SessionProvider>
    )

    const signInButton = screen.getByRole('button', { name: /sign in with google/i })
    fireEvent.click(signInButton)

    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' })
  })
}) 