import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
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

describe('Home Page', () => {
  it('shows sign in button when user is not authenticated', () => {
    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    )

    expect(screen.getByText('Welcome to Our App')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
  })

  it('shows user info when authenticated', () => {
    // Mock authenticated session
    jest.spyOn(require('next-auth/react'), 'useSession').mockImplementation(() => ({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          image: 'https://example.com/avatar.jpg',
        },
      },
      status: 'authenticated',
    }))

    render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    )

    expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })
}) 