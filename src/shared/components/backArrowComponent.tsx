import { Link } from 'react-router-dom'

function BackArrow({ top, left }: { top: string; left: string }) {
  return (
    <Link to="/login">
      <img
        className="backArrow"
        style={{ top: top, left: left }}
        src="/assets/icons/back_arrow.png"
        alt=""
      />
    </Link>
  )
}

export default BackArrow
