import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView(){
  return (
    <div className="p-4 bg-light rounded">
      <h2 className="h5">Pokédex</h2>
      <p className="mb-0">Welcome to your personal Pokémon catalog! Gotta catch 'em all!</p>
      <div className="mt-3">
        <Link to="/list" className="btn btn-primary me-2">View Pokémon</Link>
        <Link to="/new" className="btn btn-outline-primary">Add Pokémon</Link>
      </div>
    </div>
  )
}
