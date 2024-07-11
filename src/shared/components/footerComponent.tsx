import { Link } from "react-router-dom";


export function Footer() {
    return (
        <footer className="footer">
            <Link to="/privacy" className="footerLink">Privacy Policy</Link>
            <Link to="/legal-notice" className="footerLink">Legal notice</Link>
        </footer>
    );
}