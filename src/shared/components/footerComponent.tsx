import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <Link
        to="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="footerLink"
      >
        Privacy Policy
      </Link>
      <Link
        to="/legal-notice"
        target="_blank"
        rel="noopener noreferrer"
        className="footerLink"
      >
        Legal notice
      </Link>
    </footer>
  )
}
