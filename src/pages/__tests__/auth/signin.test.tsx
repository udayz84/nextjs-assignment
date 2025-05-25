import { render, screen } from '@testing-library/react'
import SignIn from '@/pages/auth/signin'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  SessionProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

describe('SignIn Page', () => {
  it('renders the sign in page with title and button', () => {
    render(
      <SessionProvider>
        <SignIn />
      </SessionProvider>
    )

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
  })
}) 