import { render, screen, fireEvent } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import SignIn from '@/pages/auth/signin'
import { ReactNode } from 'react'

// Mock next/router
const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/auth/signin',
  }),
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  SessionProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign in page correctly', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    render(<SignIn />)
    
    expect(screen.getByText('Welcome to My Journey')).toBeInTheDocument()
    expect(screen.getByText('Let\'s Begin')).toBeInTheDocument()
    expect(screen.getByText('Join me on this exciting journey of innovation and growth')).toBeInTheDocument()
  })

  it('redirects to home when user is authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
      },
      status: 'authenticated',
    })

    render(<SignIn />)
    
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('displays all feature sections', () => {
    render(<SignIn />)
    
    expect(screen.getByText('Innovation')).toBeInTheDocument()
    expect(screen.getByText('Creativity')).toBeInTheDocument()
    expect(screen.getByText('Excellence')).toBeInTheDocument()
  })
}) 