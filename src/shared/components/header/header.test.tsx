import '@testing-library/jest-dom'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../authProvider'
import { fireEvent, render, screen } from '@testing-library/react'
import Header from './header'
import useUserInitials from '../../hooks/useInitials.hook'

jest.mock('../../authProvider', () => ({
  useAuthContext: jest.fn()
}))

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    useLocation: jest.fn()
  }
})

jest.mock('../../hooks/useInitials.hook', () => jest.fn())

jest.mock('./profileDialogComponent', () => () => (
  <div data-testid="profile-dialog">Profile Dialog</div>
))

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render the header with correct elements', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({ user: {} })
    ;(useUserInitials as jest.Mock).mockReturnValue('TN')
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/privacy-policy'
    } as any)

    render(
      <Router>
        <Header />
      </Router>
    )

    // Check if the header element is present
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()

    // Check if the headline is present
    const headlineElement = screen.getByText(/Kanban Project Management Tool/i)
    expect(headlineElement).toBeInTheDocument()

    // Check if the logo is present
    const logoElement = screen.getByAltText('logo')
    expect(logoElement).toBeInTheDocument()

    // Check if the profile initials element is present
    const profileInitials = screen.getByTestId('profile-initials')
    expect(profileInitials).toBeInTheDocument()

    // Check if the help link is present
    const helpLink = screen.getByTestId('helpLink')
    expect(helpLink).toBeInTheDocument()
  })

  test('profile container has different style when in special page', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({ user: !null })
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/privacy-policy'
    } as any)
    ;(useUserInitials as jest.Mock).mockReturnValue('TN')

    render(
      <Router>
        <Header />
      </Router>
    )

    const profileInitials = screen.getByTestId('profile-initials')
    expect(profileInitials).toHaveStyle('border-color: white')
  })

  test('Profile dialog is shown or hidden when profile initials are clicked', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({ user: !null })
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/privacy-policy'
    } as any)
    ;(useUserInitials as jest.Mock).mockReturnValue('TN')

    render(
      <Router>
        <Header />
      </Router>
    )

    const profileInitials = screen.getByTestId('profile-initials')
    const profileDialog = screen.queryByTestId('profile-dialog')

    expect(profileDialog).toBeNull()

    fireEvent.click(profileInitials)

    expect(screen.getByTestId('profile-dialog')).toBeInTheDocument()
  })
})
