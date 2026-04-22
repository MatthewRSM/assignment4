import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundView() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/list" className="btn btn-primary">
        Back to List
      </Link>
    </div>
  )
}